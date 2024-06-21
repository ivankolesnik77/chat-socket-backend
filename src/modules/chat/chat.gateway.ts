import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

import { IMessage, IUser } from './interfaces';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: true,
  serveClient: false,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(client: Socket) {
    console.log('connected');
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, messageDto: CreateMessageDto) {
    try {
      const message = await this.chatService.createMessage(messageDto);

      this.server.emit('message', message);
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
