import { ApiProperty } from '@nestjs/swagger';

export class ImageRecordDto {
  @ApiProperty({ description: '记录ID' })
  id: number;

  @ApiProperty({ description: '图片URL' })
  imageUrl: string;

  @ApiProperty({ description: '缩略图URL' })
  thumbUrl: string;

  @ApiProperty({ description: '拍摄时间', required: false })
  shotAt?: Date;

  @ApiProperty({ description: '纬度', required: false })
  latitude?: number;

  @ApiProperty({ description: '经度', required: false })
  longitude?: number;

  @ApiProperty({ description: '地址', required: false })
  address?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;

  @ApiProperty({ description: '解析结果', required: false })
  result?: any;
}