import { HttpException, Injectable, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AssignRoomDto, CreateBlockDto, CreateFloorDto, CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class RoomsService {
  
  constructor(private readonly prisma: PrismaService) { }
  createRoom(createRoomDto: CreateRoomDto) {
    return this.prisma.rooms.create({
      data: createRoomDto,
    });
  }
  createBlock(createBlockDto: CreateBlockDto) {
    return this.prisma.blocks.create({
      data: createBlockDto
    })
  }
  createFloor(createFloorDto: CreateFloorDto) {
    return this.prisma.floors.create({
      data: createFloorDto
    })
  }

  async getAllRooms() {

    const occupiedRooms = await this.prisma.rooms.findMany({
      where: {
        total_occupants: {
          equals: 4
        }
      }
    })
    for (const room of occupiedRooms) {

      const updateRoomAvailability = await this.prisma.rooms.update({
        where: {
          id: room.id
        },
        data: {
          status: "Not_Available"
        }
      })
    console.log(updateRoomAvailability)
    }

    const rooms = await this.prisma.blocks.findMany({
      orderBy: [
        {
          createdAt: "desc"
        }
      ],
      include: {
        floors: {
          include: {
            rooms: {
              include: {
                allocation: true
              },
              orderBy:[
                {
                  number:"asc"
                }
              ]

            }
          }
        }
      }
    })
    return rooms;
  }

  async assignRoom(assignRoomDto: AssignRoomDto) {
    try {
      const already_assigned = await this.prisma.allocation.findFirst({
        where: {
          studentId: assignRoomDto.studentId
        }
      })
      console.log(already_assigned)
      if (already_assigned) {
        throw new HttpException('User already assigned to a room', 400)
      }


      const numberOfOccupants = await this.prisma.rooms.findUnique({
        where: {
          id: assignRoomDto.roomId
        },
        include: {
          _count: {
            select: {
              allocation: true
            }
          }
        }

      })

      // check if the room is full 

      if (numberOfOccupants._count.allocation === numberOfOccupants.max_occupants) {
        await this.prisma.rooms.update({
          where: {
            id: assignRoomDto.roomId
          },
          data: {
            status: "Not_Available"
          }
        })
        throw new HttpException("Room is full", 400)
      } else {
        await this.prisma.rooms.update({
          where: {
            id: assignRoomDto.roomId
          },
          data: {
            status: "Available",
            total_occupants: {
              increment: 1
            },
          }
        })

        return this.prisma.allocation.create({
          data: assignRoomDto
        })
      }
    } catch (error) {
      throw error || new InternalServerErrorException('Error creating student');

    }
  }


  findAll() {
    return this.prisma.rooms.findMany({
      orderBy: [
        { createdAt: 'desc' }
      ]
      , include: {
        allocation: {
          include: {
            student: true
          }
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.rooms.findUnique({
      where: {
        id
      }
    })
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.prisma.rooms.update({
      where: {
        id
      }
      ,
      data: updateRoomDto
    })
  }

  remove(id: string) {
    return this.prisma.rooms.delete({
      where: {
        id
      }
    })
  }
}
