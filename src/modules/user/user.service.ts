import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { ResponseUtil } from '@/common/utils/response.util';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  getUser(): any {
    return {
      name: 'John',
      age: 30,
    };
  }
  async findAllUsers() {
    return ResponseUtil.success(await this.prisma.user.findMany());
  }
}
