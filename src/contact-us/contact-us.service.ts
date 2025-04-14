import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/createMessage';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class ContactUsService {
    constructor(private readonly prisma: PrismaService,
        private mail: MailService
    ) { }

    async createMessage(messageDto: CreateMessageDto) {

        try {
            const message = await this.prisma.contactUs.create({
                data: messageDto
            })
            if (!message) throw new  BadRequestException("Could not add message ")
            await this.mail.contactUs(messageDto.room_number, `  Feedback From ${messageDto.full_name} `, messageDto.description)

            return message;

        } catch (error) {
            throw new InternalServerErrorException('Error sending Message');

        }
    }

}
