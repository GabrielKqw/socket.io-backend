import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Chat } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto, ChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat(createChatDto: CreateChatDto): Promise<ChatDto> {
    try {
      const chat = await this.prisma.chat.create({
        data: createChatDto,
      });

      return this.mapToChatDto(chat);
    } catch (error) {
      throw new Error('Falha ao criar o chat.');
    }
  }

  async getChatsByUserId(userId: number): Promise<ChatDto[]> {
    try {
      const chats = await this.prisma.chat.findMany({
        where: { userId },
      });

      return chats.map((chat) => this.mapToChatDto(chat));
    } catch (error) {

      throw new Error('Falha ao obter os chats por ID do usuário.');
    }
  }

  async deleteChat(chatId: number): Promise<ChatDto> {
    try {
      const chat = await this.prisma.chat.delete({
        where: { id: chatId },
      });

      if (!chat) {
        throw new NotFoundException('Chat não encontrado.');
      }

      return this.mapToChatDto(chat);
    } catch (error) {
      throw new Error('Falha ao excluir o chat.');
    }
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
