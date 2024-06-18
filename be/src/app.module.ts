import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UserModule, AuthModule, BlogModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
