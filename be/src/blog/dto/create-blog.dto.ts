import { IsNotEmpty } from "class-validator";


export class CreateBlogDto {

    id? : number ;

    @IsNotEmpty()
    authorId : number;

    @IsNotEmpty()
    blog : string;

    @IsNotEmpty()
    title: string;

}
