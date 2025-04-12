import { Injectable } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class HallService {
  constructor(private readonly prisma: PrismaService) { }
  create(createHallDto: CreateHallDto) {
    return this.prisma.hall.create({
      data: createHallDto,
    });
  }

  findAll() {
    return this.prisma.hall.findMany({
      include: {
        student: true,
      
      },
    });
  }

  findOne(id: string) {
    return this.prisma.hall.findUnique({
      where: { id },
      include: {
        student: true,
        
      },
    });
  }

  update(id: string, updateHallDto: UpdateHallDto) {
    return this.prisma.hall.update({
      where: { id },
      data: updateHallDto,
    });
  }

  remove(id: string) {
    return this.prisma.hall.delete({
      where: { id },
    });
  }
}
