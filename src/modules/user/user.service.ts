import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { RandomUtil } from '@/common/utils/random.utils';
import { PwdUtils } from '@/common/utils/pwd.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findOneByUser(user: {
    username: string;
    password?: string;
    openId?: string;
    id?: string;
  }) {
    const where: any = {};
    Object.keys(user).forEach((key) => {
      if (user[key]) {
        where[key] = user[key];
      }
    });
    if (Object.keys(where).length === 0) {
      return null;
    }
    console.log(where, 'where');
    return this.prisma.user.findUnique({
      where: {
        ...where,
      },
    });
  }

  async findOneByOpenId(openId: string) {
    console.log(openId);
    return this.prisma.user.findUnique({
      where: {
        openId,
      },
    });
  }

  async createUser(openId: string) {
    const slot = this.configService.get<string>('PWD_SLOT', '111111111');
    const default_pwd = this.configService.get<string>('DEFAULT_PWD', '123456');
    const user = {
      nickname: '图图' + RandomUtil.getRandomString(5),
      password: PwdUtils.encryptPassword(default_pwd, slot),
      username: RandomUtil.getRandomString(10),
      openId: openId,
    };
    return this.prisma.user.create({
      data: user,
    });
  }

  async getUserInfo() {
    return await this.prisma.user.findMany();
  }
}
