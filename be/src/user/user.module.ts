import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client'
import { PrismaService } from '../prisma.service';
const prisma = new PrismaClient()

@Module({
  controllers: [UserController],
  providers: [UserService , PrismaService]
})
export class UserModule {}
