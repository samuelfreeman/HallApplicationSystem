import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  InternalServerErrorException,
  NotFoundException,
  Render,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { multerConfig } from '../multer/multer';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ForgotPassword } from './dto/forgotPass';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { VerifyCode } from './dto/verify-code';
@ApiTags("Student")
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService, private readonly cloudinaryService: CloudinaryService) { }
  @Post('register')
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @UseInterceptors(FileInterceptor('profile', multerConfig))
  async create(
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 200000 }), // 200 KB
    //       new FileTypeValidator({ fileType: 'image/*' }), // Ensure it's an image
    //     ],
    //   })
    // ) file: Express.Multer.File | undefined, // Allow file to be undefined
    @Body(ValidationPipe) createStudentDto: CreateStudentDto
  ) {
    try {
      // let imageUrl: string;

      // if (file) {
      //   // If a file is provided, upload it
      //   const uploadResult = await this.cloudinaryService.uploadImage(file.path);
      //   if (!uploadResult) {
      //     throw new InternalServerErrorException('Error uploading image');
      //   }
      //   imageUrl = uploadResult.secure_url;
      // } else {
      //   // Use a dummy image if no file is provided
      const imageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbmF8ZW58MHx8MHx8fDA%3D';
      // }

      // Add the image URL to the DTO
      createStudentDto.profile = imageUrl;


      // Create the student
      const student = await this.studentService.create(createStudentDto);
      return {
        ...student
      }

    } catch (error) {
      console.error('Error during student creation:', error);
      throw new InternalServerErrorException('Error creating student');
    }
  }




  @Post('forgot-password')
  forgotPassword(@Body(ValidationPipe) checkForgotPassword: ForgotPassword) {
    return this.studentService.forgotPassword(checkForgotPassword.email);
  }

  @Post('verify-code')

  verifyResetCode(@Body(ValidationPipe)  verifyCode: VerifyCode) {
    

    return this.studentService.verifyResetCode(verifyCode.email, verifyCode.resetCode);
  }
  //  implementing cache 
  // @UseInterceptors(CacheInterceptor)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Get('single/:studentId')


  async findStudentById(studentId: string) {
    const student = await this.studentService.findByStudentId(studentId);
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    return student;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
