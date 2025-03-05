import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ResponseUtil } from '@/common/utils/response.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findOne(username: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }
  async findAllUsers() {
    return ResponseUtil.success(await this.prisma.user.findMany());
  }

  async createUser(createUserDto: any) {
    return this.prisma.user.create({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: createUserDto,
    });
  }
}
