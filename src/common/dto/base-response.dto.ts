/*
 * @Date: 2025-03-12 15:26:51
 * @LastEditors: DMBro 2073620106@qq.com
 * @LastEditTime: 2025-03-12 15:27:20
 * @FilePath: \img_parse\src\common\dto\base-response.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T, R> {
  @ApiProperty({ description: '状态码', example: 0 })
  code: number;

  @ApiProperty({ description: '响应信息', example: 'success' })
  message: string;

  @ApiProperty({ description: '响应数据' })
  data: T;

  @ApiProperty({ description: '响应元数据' })
  meta: R;
}
