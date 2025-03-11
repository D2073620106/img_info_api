// upload/upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { ImageProcessorService } from '@/modules/upload/image-processor.service';
import { UploadService } from '@/modules/upload/upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 上传文件存储的目录
    }),
  ],
  controllers: [UploadController],
  providers:[ImageProcessorService,UploadService]
})
export class UploadModule {}
