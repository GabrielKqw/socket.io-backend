export class CreateChatDto {
    message: string;
    userId: number;
  }
  
  export class ChatDto {
    id: number;
    message: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  