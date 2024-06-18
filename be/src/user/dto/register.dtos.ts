import { Prisma } from "@prisma/client";


export class UserDto implements Prisma.UserCreateInput{
    id: number;
    name : string;
    email : string;
    password: string;
}