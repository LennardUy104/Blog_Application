import { User } from "src/user/user.model";

export class Blog {
    id : number ;
    authorId : User ;
    blog : string;
    title: string;
}