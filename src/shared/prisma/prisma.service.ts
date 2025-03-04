import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma client connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database:', error);
      // 你可以在这里添加更多的错误处理逻辑，比如抛出异常或记录到日志系统
      throw error; // 重新抛出错误，以便 NestJS 可以处理它（比如通过全局异常过滤器）
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Prisma client disconnected from the database');
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
      // 同样的，你可以在这里添加更多的错误处理逻辑
      // 注意：在应用程序关闭时，通常不建议抛出未捕获的异常，因为这可能会导致应用程序无法正常关闭
    }
  }
}
