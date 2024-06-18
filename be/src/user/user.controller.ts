import { Body, ClassSerializerInterceptor, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUser } from './dtos/userUpdate.dtos';
@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
    ){}

    @Get('users')
    @UseInterceptors(ClassSerializerInterceptor)
    async getUsers(){
        return this.userService.getAllUser()
    }

    @Get('users/:id')
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Param('id') id : number){
        try {
            const user = await this.userService.getUser(id);
            if (!user) {
              throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
          } catch (e) {
            throw new InternalServerErrorException('An error occurred while fetching the user');
          }
    }

    @Put('/users/:id')
    async update(@Param('id') id : number, @Body() body : UpdateUser){
        await this.userService.updateUser(id , {id, ...body})

        return this.userService.getUser(id)
    }

    @Delete('/users/:id')
    async deleteUser(@Param('id') id: number){
        await this.userService.deleteUser(id)

        return {
            message: "User Deleted"
        }
    }
}
