import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { BaseResponseDto } from '@/common/dto/base-response.dto';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录注册' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    type: BaseResponseDto,
  })
  @ApiResponse({ status: 400, description: '参数错误' })
  @ApiResponse({ status: 401, description: '认证失败' })
  @Public()
  @Post('login')
  async login(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.login(registerDto);
  }
}
