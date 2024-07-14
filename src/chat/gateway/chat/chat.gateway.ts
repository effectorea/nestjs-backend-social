import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  handleMessage(socket: Socket, message: string): void {
    this.server.emit('newMessage', message);
  }

  afterInit(server: any): any {
    // console.log(server);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log('Connection made', client.id);
  }

  handleDisconnect(client: any): any {
    console.log('Disconnected', client.id);
  }
}
