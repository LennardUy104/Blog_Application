import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient()

@Module({
  controllers: [UserController],
  providers: [UserService , PrismaService , JwtService]
})
export class UserModule {}
