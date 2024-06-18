import { Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";


export class User implements Prisma.UserCreateInput{
    
    id: number;

    name : string;

    email : string;  

    @Exclude()
    password: string;

    is_admin?: boolean;

}