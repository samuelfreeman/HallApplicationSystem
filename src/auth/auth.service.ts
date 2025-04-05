import { Injectable } from '@nestjs/common';
import { authPayloadDto, studentPayloadDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/password/password.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private bcrypt: PasswordService, private jwt: JwtService) { }

    async validateUser({ email, password }: authPayloadDto) {
        const user = await this.prisma.admin.findUnique({
            where: {
                email
            }
        })
        if (!user) return null;
        const iSValid = await this.bcrypt.comparePassword(password, user.password)
        if (iSValid) {
            const { password, ...result } = user;
            const token = this.jwt.sign(result)

            return {token,result}
        }
    }



    async validateStudent({ studentId, password }: studentPayloadDto) {
        const user = await this.prisma.student.findUnique({
            where: {
                studentId
            }
        })

        
        if (!user) return null;
        const iSValid = await this.bcrypt.comparePassword(password, user.password)
        if (iSValid) {
            const { password, ...result } = user;
            
            const token =  this.jwt.sign(result)
            
            return {token,result}
        }
    }
}
