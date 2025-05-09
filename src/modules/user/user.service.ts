/*
 * @Date: 2025-03-08 11:31:39
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:36:32
 * @FilePath: \img_parse\src\modules\user\user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { RandomUtil } from '@/common/utils/random.utils';
import { PwdUtils } from '@/common/utils/pwd.utils';
import { ConfigService } from '@nestjs/config';
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.prisma.user.findUnique({
      where: {
        ...where,
      },
    });
  }

  async findOneByOpenId(openId: string) {
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

  async updateUser(id: number, user: UpdateUserDto) {
    const data = user;

    if (Object.keys(data).length === 0) {
      throw new Error('No valid fields to update');
    }
    try {
      return await this.prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('User not found or update failed');
    }
  }

  async getUserInfo(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      user.password = '';
      if (!user.avatar){
        user.avatar = this.configService.get<string>('STATIC_DOMAIN') + '/uploads/2025/03/26/1742953971074-erv25.png';
      }
      return user;
    }
    return null;
  }
}
