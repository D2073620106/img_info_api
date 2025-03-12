import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsEnum, IsDate } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: '昵称', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ description: '头像URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: '邮箱', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: '性别',
    enum: ['male', 'female', 'unknown'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['male', 'female', 'unknown'])
  gender?: string;

  @ApiProperty({ description: '生日', required: false })
  @IsOptional()
  @IsDate()
  birthday?: Date;

  @ApiProperty({ description: '地址', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}
