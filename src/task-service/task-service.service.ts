import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron('*/15 * * * *') //I want this to run every 15 minutes
  async handleCron() {
    this.logger.debug('Pinging the server every 15 minutes');

    try {
      const response = await axios.get('https://hallapplicationsystem.onrender.com/'); 
      this.logger.debug(`Ping successful: ${response.data}`);
    } catch (error) {
      this.logger.error(`Ping failed: ${error.message}`);
    }
  }
}
