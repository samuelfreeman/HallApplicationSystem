import { Body, Controller, HttpException, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authPayloadDto, studentPayloadDto } from './dto/auth.dto';
import { Request as request } from 'express'
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    async login(@Request() req: request, @Body() authPayload: authPayloadDto) {
        req.user
        const user = this.authService.validateUser(authPayload)

        if (!user) {

            throw new HttpException('Invalid  Credentials', 401)
        }

        return user

    }
    @Post('student/login')
    async studentLogin(@Request() req: request, @Body() authPayload: studentPayloadDto) {
        req.user
        const user = await  this.authService.validateStudent(authPayload)

        if (!user) {

            throw new HttpException('Invalid  Credentials', 401)
        }
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(user)
        return user

    }
}
