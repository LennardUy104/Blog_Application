import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register( {
      secret: 'secret',
      signOptions: {expiresIn: '1d' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , UserService , PrismaService]
})
export class AuthModule {}