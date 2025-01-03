import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { ContactUsService } from './contact-us.service';
import { MailModule } from 'src/mail/mail.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [MailModule, PrismaModule],
  controllers: [ContactUsController],
  providers: [ContactUsService]
})
export class ContactUsModule { }
