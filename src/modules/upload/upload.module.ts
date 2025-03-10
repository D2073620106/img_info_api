// upload/upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 上传文件存储的目录
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
