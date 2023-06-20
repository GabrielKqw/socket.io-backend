import {Chat} from '../../chat/entities/chat.entity'

export class User {
    id?: string;
    name: string;
    email: string;
    password: string;
    chat: Chat;

  }