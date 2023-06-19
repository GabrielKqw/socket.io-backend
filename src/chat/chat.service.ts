import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat, Prisma } from '@prisma/client';
import { CreateChatDto, ChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(chatDto: CreateChatDto): Promise<ChatDto> {
    const chat = await this.prisma.chat.create({
      data: chatDto,
    });

    return this.mapToChatDto(chat);
  }

  async getChatsByUserId(userId: number): Promise<ChatDto[]> {
    const chats = await this.prisma.chat.findMany({
      where: { userId },
    });

    return chats.map((chat) => this.mapToChatDto(chat));
  }

  async deleteChat(chatId: number): Promise<ChatDto> {
    const chat = await this.prisma.chat.delete({
      where: { id: chatId },
    });

    return this.mapToChatDto(chat);
  }

  private mapToChatDto(chat: Chat): ChatDto {
    return {
      id: chat.id,
      message: chat.message,
      userId: chat.userId,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };
  }
}
