import { BadRequestException, Body, Controller, NotFoundException, Post, Res, ResponseDecoratorOptions, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/dto/register.dtos';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service'
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller()
export class AuthController {
    constructor (
        private readonly userService: UserService,
        private readonly jwtService : JwtService
    ){}

    @Post('register')
    async register(@Body() postUser: UserDto) : Promise<User>{
        const hashedPwd = await bcrypt.hash(postUser.password, 12) 


        return this.userService.createUser({
            ...postUser,
            password: hashedPwd,
            is_admin: false,
        });
    }

    @Post('login')
    async login(
        @Body("email") email: string, 
        @Body("password") password: string,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.getUserByEmail( email );
    
        if (!user) {
            throw new NotFoundException("User not Found!");
        }
    
        if (!(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException("Invalid User or password");
        }

        const jwt = await this.jwtService.signAsync({
            id: user.id
        })

        response.cookie('jwt' ,jwt , {httpOnly: true});
    
        return {
            message: "success"
        };
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough: true}) response : Response){
        response.clearCookie('jwt');


        return {
            message: 'success logout!'
        }
    }
}
