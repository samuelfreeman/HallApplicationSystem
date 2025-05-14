import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({

  imports: [PrismaModule],
  controllers: [RoomsController],
  providers: [RoomsService,JwtService],
  
})
export class RoomsModule { }
