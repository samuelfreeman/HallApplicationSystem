import { Injectable } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ComplaintService {
  constructor(private prisma: PrismaService, 
  ) { }
  async create(createComplaintDTO:CreateComplaintDto) {

   const complaint =  await this.prisma.contactUs.create({
      data: createComplaintDTO
    });
    
    return complaint;
  }

  findAll() {
    return `This action returns all complaint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaint`;
  }

  update(id: number, updateComplaintDto: UpdateComplaintDto) {
    return `This action updates a #${id} complaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}
