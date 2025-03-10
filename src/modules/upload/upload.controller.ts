// upload/upload.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUtil } from '@/common/utils/response.util';
import { AuthService } from '@/modules/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Controller('upload')
export class UploadController {

  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: '上传文件' })
  @ApiResponse({ status: 200, description: '成功' }) // 响应描述
  @Post('')
  @UseInterceptors(FileInterceptor('file', {
    // storage: diskStorage({
    //   destination: './uploads',
    //   filename: (req, file, callback) => {
    //     const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    //     return callback(null, `${randomName}${extname(file.originalname)}`);
    //   },
    // }),
    storage: diskStorage({
      destination: (req, file, callback) => {
        // 按日期创建目录
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const uploadPath = `./uploads/${year}/${month}/${day}`;

        // 如果目录不存在，则创建
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }

        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        // 生成文件名：上传时间 + 5位随机字符串 + 文件扩展名
        const date = new Date();
        const time = date.getTime(); // 当前时间戳
        const randomString = Math.random().toString(36).substring(2, 7); // 5位随机字符串
        const ext = extname(file.originalname); // 文件扩展名
        const filename = `${time}-${randomString}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const staticDomain = this.configService.get('STATIC_DOMAIN');
    console.log(file.path);
    const url = `${staticDomain}/${file.path}`;
    return ResponseUtil.success({file: file.filename,size: file.size,url});
  }
}
