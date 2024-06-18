import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [UserModule, AuthModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
