import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage';
import { ContactUsService } from './contact-us.service';
@Controller('contact-us')
export class ContactUsController {
    constructor(private readonly contactus: ContactUsService) {

    }
    @Post()
    create(@Body(ValidationPipe) checkMessage: CreateMessageDto) {
        // Implement contact us logic here
        return this.contactus.createMessage(checkMessage)

    }
}
