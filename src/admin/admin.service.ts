import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/password/password.service';
@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private bcrypt: PasswordService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    createAdminDto.password = await this.bcrypt.hashPassword(
      createAdminDto.password,
    );

    return this.prisma.admin.create({
      data: createAdminDto,
    });
  }

  findAll() {
    return this.prisma.admin.findMany({
      orderBy: [{ createdAt: 'desc' }],
    });
  }

  findOne(id: string) {
    return this.prisma.admin.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  remove(id: string) {
    return this.prisma.admin.delete({
      where: { id },
    });
  }
}
