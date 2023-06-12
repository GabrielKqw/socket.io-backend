import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('chat')
  getChat(): string {
    return 'Chat page';
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
