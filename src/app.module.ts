import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PasswordService } from './password/password.service';
import { PasswordModule } from './password/password.module';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { HallModule } from './hall/hall.module';
import { RoomRequestModule } from './room-request/room-request.module';
import { RoomsModule } from './rooms/rooms.module';
import { ScheduleModule } from '@nestjs/schedule';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store'
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from './mail/mail.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ContactUsModule } from './contact-us/contact-us.module';
import { TasksService } from './task-service/task-service.service';




@Module({
  imports: [
    //   CacheModule.register<RedisClientOptions>({
    //   store: redisStore,
    //   url: "redis://default:R5QGmA2OqjV9UTzAaLmftbTudDcVqSxu@redis-10659.c245.us-east-1-3.ec2.redns.redis-cloud.com:10659",
    //   isGlobal: true
    // }),
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: './uploads/',
    }),
    AdminModule,
    PrismaModule,
    AuthModule,
    PasswordModule,
    ConfigModule.forRoot(),
    StudentModule,
    HallModule,
    RoomRequestModule,
    RoomsModule,
    MailModule,
    ContactUsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, PasswordService, CloudinaryService, TasksService],
})
export class AppModule { }
