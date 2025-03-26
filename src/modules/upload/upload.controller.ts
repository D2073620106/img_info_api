/*
 * @Date: 2025-03-10 13:59:06
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:23:29
 * @FilePath: \img_parse\src\modules\upload\upload.controller.ts
 */
import {
  Controller, HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { CustomFileInterceptor } from './custom-file.interceptor';
import { ResponseUtil } from '@/common/utils/response.util';
import { UploadResponseDto } from './dto/upload-response.dto';
import { BaseResponseDto } from '@/common/dto/base-response.dto';
import { UploadService } from '@/modules/upload/upload.service';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @ApiOperation({ summary: '上传图片' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: '上传成功',
    type: () => BaseResponseDto<UploadResponseDto, any>,
  })
  @ApiResponse({ status: 400, description: '文件格式错误' })
  @Post('image')
  @HttpCode(200)
  @UseInterceptors(new CustomFileInterceptor('file', 'image'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    // return ResponseUtil.success({
    //   url: file.path,
    //   filename: file.filename,
    //   size: file.size,
    //   mimetype: file.mimetype,
    // });
    return ResponseUtil.success(
      this.uploadService.uploadSingleFile(file),
    );
  }
}
