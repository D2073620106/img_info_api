import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard('local')) // 使用本地策略验证用户
  // @Post('login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @ApiOperation({ summary: '登录注册' })
  @ApiResponse({ status: 200, description: '用户创建成功' }) // 响应描述
  @ApiResponse({ status: 400, description: '请求参数错误' })
  @Public()
  @Post('login')
  async login(@Body() registerDto: RegisterDto) {
    return this.authService.login(registerDto);
  }
}
