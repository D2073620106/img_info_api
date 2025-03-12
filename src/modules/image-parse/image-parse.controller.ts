/*
 * @Date: 2025-03-12 11:22:30
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 16:09:42
 * @FilePath: \img_parse\src\modules\image-parse\image-parse.controller.ts
 */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ImageParseService } from './image-parse.service';
import { ResponseUtil } from '@/common/utils/response.util';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { User } from '@/common/decorators/user.decorator';

@Controller('image_parse')
export class ImageParseController {
  constructor(private readonly imageParseService: ImageParseService) {}

  @ApiOperation({ summary: '解析图片信息' })
  @ApiResponse({ status: 200, description: '成功' })
  @ApiQuery({ name: 'url', description: '图片URL地址', required: true })
  @Post('parse')
  async parseImage(@User() user, @Body() obj: { url: string }) {
    const result = await this.imageParseService.parseImage(obj.url, user.id);
    return ResponseUtil.success(result);
  }

  @ApiOperation({ summary: '获取图片解析历史记录' })
  @ApiResponse({ status: 200, description: '成功' })
  @Get('history')
  async getParseHistory(@User() user, @Query() query: PaginationDto) {
    console.log(query);
    const result = await this.imageParseService.getParseHistory(query, user.id);
    return ResponseUtil.success(result.list, 'success', result.pagination);
  }
}
