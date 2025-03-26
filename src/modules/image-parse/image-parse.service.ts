/*
 * @Date: 2025-03-12 11:21:43
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:11:08
 * @FilePath: \img_parse\src\modules\image-parse\image-parse.service.ts
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma/prisma.service';
import * as ExifReader from 'exifreader';
import axios from 'axios';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UploadService } from '../upload/upload.service';
import { UrlUtils } from '@/common/utils/url.utils';

@Injectable()
export class ImageParseService {
  constructor(private prisma: PrismaService) {}

  async parseImage(imageUrl: string, userId: number) {
    try {
      // 从URL获取图片数据
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data);

      // 解析 EXIF 数据
      const tags = await ExifReader.load(imageBuffer);

      // 获取拍摄时间
      const dateTimeOriginal = tags['DateTimeOriginal']?.description;
      let shotAt: Date | null = null;
      if (dateTimeOriginal) {
        const [datePart, timePart] = dateTimeOriginal.split(' ');
        const [year, month, day] = datePart.split(':').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        shotAt = new Date(year, month - 1, day, hours, minutes, seconds);
      }

      // 获取 GPS 信息
      let latitude: number | null = null;
      let longitude: number | null = null;
      if (tags['GPSLatitude'] && tags['GPSLongitude']) {
        latitude = tags['GPSLatitude'].description as unknown as number;
        longitude = tags['GPSLongitude'].description as unknown as number;
      }

      // 获取图片大小
      const fileSizeInBytes = imageBuffer.length;

      // 存储到数据库
      const record = await this.prisma.image_record.create({
        data: {
          imageUrl,
          userId,
          thumbUrl: UrlUtils.convertToThumbnailUrl(imageUrl),
          shotAt,
          latitude,
          longitude,
          result: {
            fileSize: fileSizeInBytes,
            exif: tags,
          } as any,
        },
      });

      return record;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException('无法获取图片数据', HttpStatus.BAD_REQUEST);
      }
      throw new Error(`解析图片失败: ${error.message}`);
    }
  }

  async getParseHistory(query: PaginationDto, userId: number) {
    const { page = 1, pageSize = 10 } = query;
    const skip = (page - 1) * pageSize;
    const where = { userId };

    const [total, list] = await Promise.all([
      // 获取总数
      this.prisma.image_record.count({ where }),
      // 获取分页数据
      this.prisma.image_record.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    return {
      list,
      pagination: {
        current: page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
