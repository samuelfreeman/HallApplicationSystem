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
import { ComplaintModule } from './complaint/complaint.module';
import { PaystackModule } from './paystack/paystack.module';
import { PaystackController } from './paystack/paystack.controller';
import { PaystackService } from './paystack/paystack.service';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';
import { ThrottlerModule } from '@nestjs/throttler';




@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 900000,
          limit: 20,
        },
      ],
    }),
    JwtModule.register({
      global:true ,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'1d'}
    }),
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
    RoomsModule,
    MailModule,
    ContactUsModule,
    ComplaintModule,
    PaystackModule,
    ChatModule,
    
    
  ],
  controllers: [AppController,PaystackController],
  providers: [AppService, PasswordService, CloudinaryService, TasksService,PaystackService],
})
export class AppModule { }
