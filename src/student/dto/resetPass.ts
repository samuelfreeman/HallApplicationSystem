import { IsEmail, IsString } from "class-validator";


export class ResetPass {
    @IsEmail()
    email: string;
    
    password: string
    
}