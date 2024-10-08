import {
  IsString,
  IsEmail,
  IsInt,
  IsStrongPassword,
  IsOptional,
  IsPhoneNumber,
  
} from 'class-validator';
import { Transform} from 'class-transformer';
export class CreateStudentDto {
  @IsString()
  studentId: string;
  profile: string; // this is an image
  @IsString()
  fullName: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  gender: string;  
  @Transform(({ value }) => parseInt(value, 10))
  level: number;
  @IsPhoneNumber('GH')
  telephone: string;
  @IsOptional()
  @IsString()
  department: string;
}
