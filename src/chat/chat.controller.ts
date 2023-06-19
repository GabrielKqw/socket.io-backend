import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { ChatDto, CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createChat(@AuthenticatedUser() user: any, @Body() createChatDto: CreateChatDto): Promise<ChatDto> {
    createChatDto.userId = user.id;
    return this.chatService.createChat(createChatDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getChatsByUserId(@AuthenticatedUser() user: any): Promise<ChatDto[]> {
    return this.chatService.getChatsByUserId(user.id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteChat(@Param('id') chatId: number): Promise<ChatDto> {
    return this.chatService.deleteChat(chatId);
  }
}
