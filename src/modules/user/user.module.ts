import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { UploadService } from '@/modules/upload/upload.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
