import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '@/common/decorators/public.decorator';
import { User } from '@/common/decorators/user.decorator';
import { ResponseUtil } from '@/common/utils/response.util';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomFileInterceptor } from '@/modules/upload/custom-file.interceptor';
import { UploadService } from '@/modules/upload/upload.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly uploadService: UploadService,
  ) {}

  @ApiOperation({ summary: '用户信息' })
  @ApiResponse({ status: 200, description: '成功' }) // 响应描述
  // @Public()
  @Get('info')
  async getUserInfo(@User() user: any) {
    if (!user?.id) {
      return ResponseUtil.error(404, '用户不存在');
    }
    const userInfo = await this.userService.getUserInfo(user.id);
    if (!userInfo) {
      return ResponseUtil.error(404, '用户不存在');
    }
    user.password = '';
    return ResponseUtil.success(user);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '成功' }) // 响应描述
  // @Public()
  @Post('update')
  @HttpCode(200)
  async updateUser(
    @Body() user: { nickname: string; avatar: string },
    @User() userInfo: any,
  ) {
    await this.userService.updateUser(userInfo.id, user);
    return ResponseUtil.success({});
  }

  // @ApiOperation({ summary: '上传头像，成功后返回压缩后url地址' })
  // @ApiResponse({ status: 200, description: '成功' }) // 响应描述
  // // @Public()
  // @Post('updateAvatar')
  // @HttpCode(200)
  // @UseInterceptors(
  //   new CustomFileInterceptor('file', 'image', { imageSize: [128, 128] }),
  // )
  // async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
  //   const fileInfo = this.uploadService.uploadSingleFile(file);
  //   return ResponseUtil.success(fileInfo);
  // }
}
