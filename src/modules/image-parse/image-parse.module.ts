/*
 * @Date: 2025-03-12 11:22:38
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:03:54
 * @FilePath: \img_parse\src\modules\image-parse\image-parse.module.ts
 */
import { Module } from '@nestjs/common';
import { ImageParseController } from './image-parse.controller';
import { ImageParseService } from './image-parse.service';
import { PrismaModule } from '@/shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ImageParseController],
  providers: [ImageParseService],
})
export class ImageParseModule {}
