import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头中提取 JWT
      ignoreExpiration: false, // 不忽略过期时间
      secretOrKey: 'your-secret-key', // 替换为你的密钥
    });
  }

  async validate(payload: any) {
    // 这里可以根据 payload 中的信息进一步验证用户
    return { userId: payload.sub, username: payload.username };
  }
}
