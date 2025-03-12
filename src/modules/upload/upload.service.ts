/*
 * @Date: 2025-03-11 23:33:12
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:04:45
 * @FilePath: \img_parse\src\modules\upload\upload.service.ts
 */
// file-upload.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  // 上传单个文件
  uploadSingleFile(file: Express.Multer.File) {
    const staticDomain = this.configService.get('STATIC_DOMAIN');
    let thumbnailPath = '';
    // 判断文件是否为图片
    if (file.mimetype.startsWith('image/')) {
      // 调用图片处理器进行压缩和裁剪
      const originalPath = file.path; // 原始文件路径
      thumbnailPath = originalPath.replace(
        extname(file.originalname),
        `-thumb${extname(file.originalname)}`,
      ); // 缩略图路径
    }
    // 将路径中的反斜杠替换为正斜杠
    const fileUrl = `${staticDomain}/${file.path.replace(/\\/g, '/')}`;
    const thumbUrl = thumbnailPath
      ? `${staticDomain}/${thumbnailPath.replace(/\\/g, '/')}`
      : null;

    return {
      file: file.filename,
      size: file.size,
      url: fileUrl, // 替换后的文件访问地址
      thumbUrl: thumbUrl, // 替换后的缩略图访问地址
    };
  }
}
