import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/password/password.service';
import { MailService } from 'src/mail/mail.service';
import { data } from 'autoprefixer';
import { JwtService } from '@nestjs/jwt';
import { all } from 'axios';
@Injectable()
export class StudentService {
  constructor(
    private readonly prisma: PrismaService,
    private bcrypt: PasswordService,
    private mail: MailService,
    private jwt: JwtService,

  ) { }
  async create(createStudentDto: CreateStudentDto) {

    const checkUser = await this.prisma.student.findFirst({
      where: {
        OR: [
          {
            studentId: createStudentDto.studentId
          },
          {
            email: createStudentDto.email,
          },
          {
            telephone: createStudentDto.telephone
          }
        ]
      }
    })
    
    if (checkUser) {
      throw   new HttpException('User already exists' ,400 )
    }

    createStudentDto.password = await this.bcrypt.hashPassword(
      createStudentDto.password,
    );
    
    
    const student = await this.prisma.student.create({
      
      data: createStudentDto,
    });
    const { password, ...result } = student
    const token = this.jwt.sign(result)
    await this.mail.contactUs(1,`New user just signed up!`,`${student.fullName}`)
    
    return { token, result }
  }

  findAll() {
    return this.prisma.student.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      include: {
        hall: {
          select: {
            name: true,
          },
        },
        allocation: {
          select: {
            rooms: {
              select: {
                number: true,
              },
            },
          },
        },
      },
    });
  }
//   Room Details

// Room Type: Shared

// Room Assigned: 3

// Floor/Block: 9

// Duration of Stay: 8 months

  async findByStudentId(studentId: string) {


    const user = await this.prisma.student.findUnique({
      where: { studentId },
      include: {
        allocation: {
          include: {
            rooms: {
              include: {
                floors: {
                  include: {
                    blocks: {
                      select: {
                        name: true, // Block name
                      },
                    },
                  },
                  select: {
                    number: true, // Floor number
                  },

                },
                
              },
              select:{
                number:true
              }
            },

          },
        },
      },

    });
    console.log(user)

    if (!user) {
      throw new NotFoundException(`User with ID ${studentId} not found`);
    }
    return user;



  }
  async findOne(id: string) {
 const user =   await this.prisma.student.findUnique({
      where: {
        id,
      },
    });

    const allocation =await this.prisma.allocation.findUnique({
      where :{
        studentId:user.studentId
      }
    })
    if(allocation !=null ){
    console.log(allocation)
    const room = await this.prisma.rooms.findUnique({
      where: {
        id: allocation.roomId
      },
    
    });
    const floor = await this.prisma.floors.findUnique({
      where:{
        id:room.floorId
      }
    })
    const block = await this.prisma.blocks.findUnique({
      where:{
        id:floor.blocksId
      }
    })
    return {...user,roomNumber:room.number,floorNumber:floor.number,blockName:block.name}
  }else{
    return user
    
  }

  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: {
        id,
      },
      data: updateStudentDto,
    });
  }



  async forgotPassword(email: string) {
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const user = await this.prisma.student.findUnique({
      where: {
        email,
      },
    });
    if (user) {

      user.resetCode = code;
      const expiry = new Date(new Date().getTime() + 300000);



      await this.prisma.student.update({
        where: {
          email: user.email
        },
        data: {
          resetCode: code,
          resetCodeExpiry: expiry
        },
      })
    }

    else {
      throw new BadRequestException("User with this email does not exist")
    }


    return this.mail.sendMail(email, "Testing", "The nodemailer is working", ` <p>Dear Student your code is ${code} </p>   `)

  }

  async resetPassword(email: string, password: string) {
    return await this.prisma.student.update({
      where: {
        email
      },
      data: {
        password: await this.bcrypt.hashPassword(password)
      }
    })

  }

  async verifyResetCode(email: string, code: string): Promise<void> {

    const user = await this.prisma.student.findUnique({ where: { email } });
    console.log(user.resetCodeExpiry)
    console.log(user)
    if (!user || user.resetCodeExpiry < new Date()) {
      throw new Error('Invalid or expired code');
    }
    // Clear reset code after successful verification
    await this.prisma.student.update({
      where: {
        email: email,
      },
      data: {
        resetCode: null,
        resetCodeExpiry: null
      }
    });
  }


  remove(id: string) {
    return this.prisma.student.delete({
      where: {
        id,
      },
    });
  }
}
