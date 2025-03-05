import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@/modules/user/user.module';
import { AuthController } from './auth.controller';
import { UserService } from '@/modules/user/user.service'; // 假设你有一个 UsersModule

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your-secret-key', // 替换为你的密钥
      signOptions: { expiresIn: '7d' }, // 设置 Token 过期时间
    }),
    UserModule, // 导入 UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // 如果有控制器，添加到这里
  exports: [AuthService], // 导出 AuthService
})
export class AuthModule {}
