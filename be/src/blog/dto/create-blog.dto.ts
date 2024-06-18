import { IsNotEmpty } from "class-validator";


export class CreateBlogDto {

    id : number ;

    @IsNotEmpty()
    author : number;

    @IsNotEmpty()
    blog : string;

    @IsNotEmpty()
    title: string;

}
