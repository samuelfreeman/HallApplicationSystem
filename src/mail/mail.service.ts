import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'



@Injectable()
export class MailService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',

            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

    }
    async sendMail(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
            html
        }
        try {
            const info = await this.transporter.sendMail(mailOptions)
            console.log('Email sent: %s', info.messageId);
            return info
        } catch (error) {
            console.error('Error sending email', error)
            throw new Error('Failed to send mail')
        }
    }
    async contactUs(from: number, subject: string, text: string) {
        const mailOptions = {
            from,
            to: process.env.EMAIL,
            subject,
            text
        }
        try {
            const info = await this.transporter.sendMail(mailOptions)
            console.log('Email sent: %s', info.messageId);
            return info
        } catch (error) {
            console.error('Error sending email', error)
            throw new Error('Failed to send mail')
        }

    }
}