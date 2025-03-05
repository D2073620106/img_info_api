import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseUtil } from '@/common/utils/response.util';
import { RandomUtil } from '@/common/utils/random.utils';
import { ConfigService } from '@nestjs/config';
import { PwdUtils } from '@/common/utils/pwd.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return ResponseUtil.success({
      access_token: this.jwtService.sign(payload),
    });
  }

  async register(registerDto: RegisterDto) {
    const slot = this.configService.get<string>('PWD_SLOT', '111111111');
    const default_pwd = this.configService.get<string>('DEFAULT_PWD', '123456');
    const user = {
      nickname: RandomUtil.getRandomChineseString(5),
      password: PwdUtils.encryptPassword(default_pwd, slot),
      username: RandomUtil.getRandomString(10),
    };
    // 调用 UsersService 创建用户
    return ResponseUtil.success(await this.userService.createUser(user));
  }
}
