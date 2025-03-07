import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('info')
  async getUserInfo(@Request() req) {
    console.log(req);
    return await this.userService.getUserInfo();
  }
}
