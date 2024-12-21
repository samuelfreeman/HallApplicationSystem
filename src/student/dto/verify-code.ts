import { IsEmail, IsString } from "class-validator";


export class VerifyCode {
    @IsEmail()
    email: string;
    
    resetCode: string
    
}