import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // 使用 FileInterceptor 而不是 FilesInterceptor
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Observable } from 'rxjs';
import * as fs from 'fs';
import * as sharp from 'sharp';

type AllowedFileType = 'image' | 'video' | 'pdf' | 'word' | 'excel';

interface FileCompressionConfig {
  imageSize?: [number, number];
}

@Injectable()
export class CustomFileInterceptor<T = any> implements NestInterceptor<T> {
  constructor(
    private readonly name: string,
    private readonly fileType: AllowedFileType,
    private readonly compressionConfig?: FileCompressionConfig,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      const allowedTypes = {
        image: ['image/jpeg', 'image/png', 'image/gif'],
        video: ['video/mp4'],
        pdf: ['application/pdf'],
        word: [
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ],
        excel: [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
      };

      if (!allowedTypes[this.fileType].includes(file.mimetype)) {
        return cb(new Error('File type not allowed'), false);
      }
      cb(null, true);
    };

    const storage = diskStorage({
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
    });

    const compressionHandler = async (file: Express.Multer.File) => {
      if (this.fileType === 'image' && this.compressionConfig?.imageSize) {
        const originalPath = file.path;
        const thumbnailPath = originalPath.replace(
          extname(file.originalname),
          `-thumb${extname(file.originalname)}`,
        ); // 缩略图路径
        await sharp(originalPath)
          .resize(
            this.compressionConfig.imageSize[0] || 200,
            this.compressionConfig.imageSize[1] || 200,
          ) // 调整尺寸
          .toFile(thumbnailPath);
      }
    };

    // 使用 FileInterceptor 而不是 FilesInterceptor
    const fileInterceptor = FileInterceptor(this.name, {
      storage,
      fileFilter,
    });

    // 实例化 FileInterceptor 返回的类
    const interceptorInstance = new fileInterceptor();

    return new Observable((observer) => {
      interceptorInstance.intercept(context, {
        // @ts-ignore
        handle: () => {
          const request = context.switchToHttp().getRequest();
          const file = request.file; // 获取单个文件

          if (file && this.fileType === 'image') {
            compressionHandler(file)
              .then(() => {
                // 返回 next.handle() 的 Observable
                next.handle().subscribe({
                  next: (value) => observer.next(value),
                  error: (err) => observer.error(err),
                  complete: () => observer.complete(),
                });
              })
              .catch((err) => observer.error(err));
          } else {
            // 返回 next.handle() 的 Observable
            next.handle().subscribe({
              next: (value) => observer.next(value),
              error: (err) => observer.error(err),
              complete: () => observer.complete(),
            });
          }
        },
      });
    });
  }
}
