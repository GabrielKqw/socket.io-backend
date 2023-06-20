import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { ChatDto, CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';
import { User } from '../user/entities/user.entity';

@Controller('chats')
export class ChatController {
  constructor(@Inject(ChatService) private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createChat(@AuthenticatedUser() user: User, @Body() createChatDto: CreateChatDto): Promise<ChatDto> {
    createChatDto.userId = parseInt(user.id);
    return this.chatService.createChat(createChatDto);
  }
 
  
  @UseGuards(AuthGuard)
  @Get()
  async getChatsByUserId(@AuthenticatedUser() user: User): Promise<ChatDto[]> {
    const userId = parseInt(user.id);
    return this.chatService.getChatsByUserId(userId);
  }
  
  

  @UseGuards(AuthGuard) 
  @Delete(':id')
  async deleteChat(@Param('id') chatId: number): Promise<void> {
    await this.chatService.deleteChat(chatId);
  }
}
