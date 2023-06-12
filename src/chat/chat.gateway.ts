import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.model';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  connectedUsers: { [key: string]: User } = {};

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;
    
    try {
      const user = this.validateToken(token);
      this.connectedUsers[client.id] = user;
      this.server.emit('userConnected', user.id);
    } catch (error) {
      console.error('Error during user authentication:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = this.connectedUsers[client.id];
    delete this.connectedUsers[client.id];
    if (user) {
      this.server.emit('userDisconnected', user.id);
    }
  }

  validateToken(token: string): User {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.user;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string }) {
    const user = this.connectedUsers[client.id];
    if (!user) {
      return;
    }

    const { message } = payload;
    this.server.emit('messageReceived', { userId: user.id, message });
  }

  @SubscribeMessage('getOnlineUsers')
  handleGetOnlineUsers(client: Socket) {
    const onlineUsers = Object.values(this.connectedUsers).map(user => user.id);
    client.emit('onlineUsers', onlineUsers);
  }
}
