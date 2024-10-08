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
@ApiTags("Student")
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService, private readonly cloudinaryService: CloudinaryService) { }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('profile', multerConfig)) // 'profile' matches the input name in the form
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200000 }), // 200 KB
        ],
      })
    )
    file: Express.Multer.File,

    @Body(ValidationPipe) createStudentDto: CreateStudentDto
  ) {
    console.log(file.path)
    // Ensure the file  present before trying to upload
    if (!file) {
      throw new BadRequestException('Missing required file: profile');
    }
    try {
      // Upload the file to Cloudinary
      const imageUrl = await this.cloudinaryService.uploadImage(file.path);

      if (!imageUrl) {
        throw new InternalServerErrorException('Error uploading image');
      }
      // Add the Cloudinary image URL to the DTO
      createStudentDto.profile = imageUrl.secure_url;

      // Create the student
      return await this.studentService.create(createStudentDto);

    } catch (error) {
      console.error('Error during student creation:', error);
      throw new InternalServerErrorException('Error creating student');
    }
  }


  @Get("register")
  @Render('signUp') // renders thhe signUp page
  renderRegister() {
    return { title: "Registration Page" };
  }




  @Post('forgot-password')
  forgotPassword(@Body(ValidationPipe) checkForgotPassword: ForgotPassword) {
    return this.studentService.forgotPassword(checkForgotPassword.email);
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
