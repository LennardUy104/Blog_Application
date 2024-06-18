import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto{

    id: number;

    @IsNotEmpty()
    name : string;
    @IsEmail()
    email : string;

    @Exclude()
    password: string;
}