import { Controller, Get, Render ,Request} from '@nestjs/common';
import { AppService } from './app.service';
import {Request as request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  
  getHello(@Request() req:request) {
  
    return this.appService.getHello();
  }
}
