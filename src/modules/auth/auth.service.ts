import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/modules/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseUtil } from '@/common/utils/response.util';
import { RandomUtil } from '@/common/utils/random.utils';
import { ConfigService } from '@nestjs/config';
import { PwdUtils } from '@/common/utils/pwd.utils';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async validateUser(username: string, userId: string) {
    return await this.userService.findOneByUser({ username, id: userId });
  }

  /**
   * 使用 code 换取 openid 和 session_key
   * @param code 小程序端传来的 code
   * @returns openid 和 session_key
   */
  async getWechatSession(
    code: string,
  ): Promise<{ openId: string; session_key: string }> {
    const appid = this.configService.get<string>('WX_APPID'); // 小程序 AppID
    const secret = this.configService.get<string>('WX_APP_SECRET'); // 小程序 AppSecret
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;

    const response = await firstValueFrom(this.httpService.get(url));

    const { openid, session_key } = response.data;

    if (!openid || !session_key) {
      throw new Error('Failed to get openid and session_key');
    }

    return { openId: openid, session_key };
  }

  /**
   * 生成 access_token
   * @param payload
   * @private
   */
  private generateAccessToken(payload: {
    userId: string;
    username: string;
  }): string {
    return this.jwtService.sign(payload);
  }

  /**
   * 登录
   * @param registerDto
   */
  async login(registerDto: RegisterDto) {
    const { openId } = await this.getWechatSession(registerDto.code);
    const findUser = await this.userService.findOneByOpenId(openId);

    if (findUser) {
      return ResponseUtil.success({
        token: this.generateAccessToken({
          userId: findUser.id as unknown as string,
          username: findUser.username as unknown as string,
        }),
      });
    }

    // 调用 UsersService 创建用户
    const createUser = await this.userService.createUser(openId);
    return ResponseUtil.success({
      token: this.generateAccessToken({
        userId: createUser.id as unknown as string,
        username: createUser.username as unknown as string,
      }),
    });
  }
}
