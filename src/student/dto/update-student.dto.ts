import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  fullName?: string;
  email?: string;
  studentId?: string;
  password?: string;
  profile?: string;
  gender?: string;
  level?: number;
  telephone?: string;
  department?: string;
  resetCode?: string;
  resetCodeExpiry?: Date;

}
