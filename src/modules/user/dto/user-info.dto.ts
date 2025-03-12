/*
 * @Date: 2025-03-12 15:32:59
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:35:05
 * @FilePath: \img_parse\src\modules\user\dto\user-info.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({ description: '用户ID' })
  id: number;

  @ApiProperty({ description: '用户名', required: false })
  username?: string;

  @ApiProperty({ description: '昵称', required: false })
  nickname?: string;

  @ApiProperty({ description: '头像URL', required: false })
  avatar?: string;

  @ApiProperty({ description: '手机号', required: false })
  phone?: string;

  @ApiProperty({ description: '邮箱', required: false })
  email?: string;

  @ApiProperty({
    description: '性别',
    enum: ['male', 'female', 'unknown'],
    required: false,
  })
  gender?: string;

  @ApiProperty({ description: '生日', required: false })
  birthday?: Date;

  @ApiProperty({ description: '地址', required: false })
  address?: string;

  @ApiProperty({
    description: '用户状态',
    enum: ['active', 'disabled'],
    default: 'active',
  })
  status: string;

  @ApiProperty({ description: '注册时间' })
  createdAt: Date;

  @ApiProperty({ description: '最后登录时间', required: false })
  lastLoginAt?: Date;
}
