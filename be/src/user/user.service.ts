import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './user.model';

@Injectable()
export class UserService {

    constructor (private prisma : PrismaService){}

    async getAllUser(): Promise<User[]>{
        return this.prisma.user.findMany()
    }

    async getUser(id : number) : Promise<User>{
        return this.prisma.user.findFirst( { where: { id:Number(id) } });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findFirst({ where: { email } });
      }

    async createUser(data : User) : Promise<User>{
        return this.prisma.user.create({
            data,
        })
    }

    async updateUser (id : number , data : User) : Promise <User> {
        return this.prisma.user.update({
            where: { id:Number(id)} ,
            data: {name: data.name , password: data.password , email: data.email , is_admin : data.is_admin}
        })
    }

    async deleteUser(id:number) : Promise <User>{
        return this.prisma.user.delete({
            where: {id: Number(id)}
        })
    }
}