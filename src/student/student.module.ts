import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PasswordModule } from 'src/password/password.module';
import { MailModule } from 'src/mail/mail.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [PrismaModule, PasswordModule, MailModule,   JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'1h'}
    })],
  controllers: [StudentController],
  providers: [StudentService,CloudinaryService],
})
export class StudentModule {}
