import { User } from '../../user/entities/user.entity';

export interface Chat {
  id: number;
  message: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
