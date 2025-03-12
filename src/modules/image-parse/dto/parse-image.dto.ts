import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ParseImageDto {
  @ApiProperty({
    description: '图片URL地址',
    example: 'https://example.com/image.jpg',
  })
  @IsNotEmpty({ message: 'URL不能为空' })
  @IsString({ message: 'URL必须是字符串' })
  @IsUrl({}, { message: '请输入有效的URL' })
  url: string;
}