// upload/upload.controller.ts
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseUtil } from '@/common/utils/response.util';
import { ConfigService } from '@nestjs/config';
import { CustomFileInterceptor } from '@/modules/upload/custom-file.interceptor';
import { UploadService } from '@/modules/upload/upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService,
    // private readonly imageProcessorService: ImageProcessorService,
  ) {}

  @ApiOperation({ summary: '上传文件' })
  @ApiResponse({ status: 200, description: '成功' }) // 响应描述
  @Post('')
  @HttpCode(200)
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: (req, file, callback) => {
  //         // 按日期创建目录
  //         const date = new Date();
  //         const year = date.getFullYear();
  //         const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //         const day = date.getDate().toString().padStart(2, '0');
  //         const uploadPath = `./uploads/${year}/${month}/${day}`;
  //
  //         // 如果目录不存在，则创建
  //         if (!fs.existsSync(uploadPath)) {
  //           fs.mkdirSync(uploadPath, { recursive: true });
  //         }
  //
  //         callback(null, uploadPath);
  //       },
  //       filename: (req, file, callback) => {
  //         // 生成文件名：上传时间 + 5位随机字符串 + 文件扩展名
  //         const date = new Date();
  //         const time = date.getTime(); // 当前时间戳
  //         const randomString = Math.random().toString(36).substring(2, 7); // 5位随机字符串
  //         const ext = extname(file.originalname); // 文件扩展名
  //         const filename = `${time}-${randomString}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  @UseInterceptors(
    new CustomFileInterceptor('file', 'image', { imageSize: [128, 128] }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    // const staticDomain = this.configService.get('STATIC_DOMAIN');
    // const originalPath = file.path; // 原始文件路径
    // const thumbnailPath = originalPath.replace(
    //   extname(file.originalname),
    //   `-thumb${extname(file.originalname)}`,
    // ); // 缩略图路径
    // 使用服务压缩图片
    // await this.imageProcessorService.resizeImage(
    //   originalPath,
    //   thumbnailPath,
    //   128,
    //   128,
    // );
    return ResponseUtil.success(this.uploadService.uploadSingleFile(file));
  }
}
