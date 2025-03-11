// image/image-processor.service.ts
import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessorService {
  /**
   * 压缩图片并生成缩略图
   * @param filePath 原始文件路径
   * @param thumbnailPath 缩略图路径
   * @param width 缩略图宽度
   * @param height 缩略图高度
   */
  async resizeImage(
    filePath: string,
    thumbnailPath: string,
    width: number,
    height: number,
  ): Promise<void> {
    try {
      await sharp(filePath)
        .resize(width, height) // 调整尺寸
        .toFile(thumbnailPath);
    } catch (error) {
      throw new Error(`Failed to process image: ${error.message}`);
    }
  }
}
