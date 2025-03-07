import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '@/common/decorators/public.decorator';
import { User } from '@/common/decorators/user.decorator';
import { ResponseUtil } from '@/common/utils/response.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Public()
  @Get('info')
  async getUserInfo(@User() user) {
    if (!user?.id) {
      return ResponseUtil.error(404, '用户不存在');
    }
    const userInfo = await this.userService.getUserInfo(user.id);
    if (!userInfo) {
      return ResponseUtil.error(404, '用户不存在');
    }
    return ResponseUtil.success(userInfo);
  }
}
