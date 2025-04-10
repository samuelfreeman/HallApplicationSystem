import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateRoomRequestDto } from './dto/create-room-request.dto';
import { UpdateRoomRequestDto } from './dto/update-room-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomRequestService {
  constructor(private readonly prisma: PrismaService
  ) { }
  async create(createRoomRequestDto: CreateRoomRequestDto) { 

    // try {
    //   /*
      
    //   *we supposed to process payments right after checking  if rooms are available, 
    //   *if they are then  we process the payment , we are going to use ecobanks api 
    //   *or use momo services to 
    //   *pay into the eco bank account the autonomy ecobank account 
      
      
    //   */

    //   // * search for available rooms 
    //   const room = await this.prisma.rooms.findFirst({
    //     where: {
    //       status: {
    //         not: 'Occupied'
    //       }
    //     }
    //   })

    //   //  !if there are no rooms we throw an  error 
    //   if (!room) {
    //     throw new Error('No available rooms')
    //   }
    //   //  *we allocate room to students
    //   //  *create a new allocation with the roomid and the student id
    //   await this.prisma.allocation.create({
    //     data: {
    //       roomsId: room.id,
    //       studentId: createRoomRequestDto.StudentId

    //     }
    //   })
    //   // * increase the number of allocations in the room entity 
    //   await this.prisma.rooms.update({
    //     where: {
    //       id: room.id
    //     },
    //     data: {
    //       numberOfAllocations: room.numberOfAllocations + 1
    //     }
    //   })

    //   // *update  the rooms with number of allocation  to occupied
    //   // ? so now when the number of allocations is equal to the limit we set the status to  occupied 
    //   await this.prisma.rooms.updateMany({
    //     where: {
    //       numberOfAllocations: {
    //         equals: this.prisma.rooms.fields.limit
    //       }
    //     },
    //     data: {
    //       status: 'Occupied'
    //     }
    //   })


    //   //  *Approve the request 
    //   return this.prisma.roomRequest.create({
    //     data: {
    //       status: 'Approved',
    //       StudentId: createRoomRequestDto.StudentId
    //     }
    //   })

    // } catch (error) {
    //   throw new InternalServerErrorException(error.message)
    // }
  }

  findAll() {
    return this.prisma.roomRequest.groupBy({
      by: ['status'],


    });
  }

  findOne(id: string) {
    return this.prisma.roomRequest.findUnique({
      where: {
        id
      },
      include: {
        student: true
      }
    });
  }

  update(id: string, updateRoomRequestDto: UpdateRoomRequestDto) {
    return this.prisma.roomRequest.update({
      where: {
        id
      },
      data: updateRoomRequestDto
    });
  }

  remove(id: string) {
    return this.prisma.roomRequest.delete({
      where: {
        id
      }
    })
  }
}
