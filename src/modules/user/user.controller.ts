/*
 * @Date: 2025-03-08 11:31:39
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:35:57
 * @FilePath: \img_parse\src\modules\user\user.controller.ts
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseUtil } from '@/common/utils/response.util';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@/common/decorators/user.decorator';
import { UserInfoDto } from './dto/user-info.dto';
import { BaseResponseDto } from '@/common/dto/base-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '获取用户信息' })
  @ApiResponse({
    status: 200,
    description: '成功',
    type: () => BaseResponseDto<UserInfoDto, any>,
  })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Get('info')
  async getUserInfo(@User() user: any) {
    if (!user?.id) {
      return ResponseUtil.error(404, '用户不存在');
    }
    const userInfo = await this.userService.getUserInfo(user.id);
    if (!userInfo) {
      return ResponseUtil.error(404, '用户不存在');
    }
    return ResponseUtil.success(userInfo);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({
    status: 200,
    description: '成功',
    type: () => BaseResponseDto<UserInfoDto, any>,
  })
  @ApiResponse({ status: 400, description: '参数错误' })
  @ApiResponse({ status: 401, description: '未授权' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @Post('update')
  async updateUserInfo(
    @User() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (!user?.id) {
      return ResponseUtil.error(404, '用户不存在');
    }
    const updatedUser = await this.userService.updateUser(
      user.id,
      updateUserDto,
    );
    return ResponseUtil.success(updatedUser);
  }
}
