import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '微信登录code',
    example: '123456',
    required: true,
  })
  @IsNotEmpty({ message: 'code不能为空' })
  @IsString({ message: 'code必须是字符串' })
  @Length(1, 128, { message: 'code长度必须在1-128之间' })
  code: string;
}
