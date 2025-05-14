import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createChatDto: CreateChatDto) {
    try {
      const chat = await this.prisma.chat.create({
        data: createChatDto
      })
      return chat;
    } catch (error) {
      console.log(error)
      return error
    }
  }
  async globalCreate(createChatDto: CreateChatDto) {
    try {

      const chat = await this.prisma.chat.create({
        data: {
          global: true,
          ...createChatDto
        }
      })
      return chat;
    } catch (error) {
      console.log(error)
      return error
    }
  }
  async globalFindAll() {
    try {
      // add sender's name to each chat

      const chat = await this.prisma.chat.findMany({
        where: {
          global: true
        },
        include: {
          student: {
            select: { fullName: true }
          }
        },
        orderBy:
        {
          createdAt: 'desc'
        }

      });
      console.log(chat)
      return chat
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async findRoomChats(roomId: string) {
    try {
      const students = await this.prisma.rooms.findUnique({
        where: {
          id: roomId
        },
        include: {
          allocation: {
            include: {
              student: true
            }
          }
        }
      })
      const studentsIds = students.allocation.map(allocation => allocation.studentId);
      console.log(studentsIds)
      const chats = await this.prisma.chat.findMany({
        where: {
          studentId: {
            in: studentsIds
          },
          global: false
        },
        orderBy: {
          createdAt: 'desc'
        }
      });


      // add sender's name to each chat
      const chatsWithSender = await Promise.all(
        chats.map(async (chat) => {
          const student = await this.prisma.student.findUnique({
            where: { studentId: chat.studentId },
            select: { fullName: true }
          });

          return {
            ...chat,
            senderName: student?.fullName || "Unknown"
          };
        })
      );

      return chatsWithSender

    } catch (error) {
      console.log(error)
      return error
    }
  }
  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    try {
      return await this.prisma.chat.update({
        where: {
          id
        },
        data: updateChatDto
      });
    } catch (error) {
      console.log(error);
      return error
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.chat.delete({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async listMembers(roomId: string) {
    // this lists Members of a room  when you provide the room id 
    try {
      const members = await this.prisma.rooms.findUnique({
        where: {
          id: roomId
        },
        include: {
          allocation: {
            include: {
              student: true
            }
          }
        }
      })
      return members.allocation.map(allocation => allocation.student)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async globalListMembers() {

    try {
      const members = await this.prisma.allocation.findMany({
        include: {
          student: true
        }
      })
      return members.map(allocation => allocation.student)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
