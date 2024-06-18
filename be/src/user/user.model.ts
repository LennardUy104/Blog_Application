import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from 'class-validator';


export class User{
    
    id: number;

    @IsNotEmpty()
    name : string;

    @IsEmail()
    email : string;  

    @Exclude()
    @IsNotEmpty()
    password: string;

    is_admin?: boolean;

}