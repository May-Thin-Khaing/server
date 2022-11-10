import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import moment from 'moment';
import { Socket, Server } from 'socket.io';
import { RouteService } from './modules/route/services/route.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  constructor(private routeService: RouteService) {}

  @SubscribeMessage('location-to-server')
  async handleLocation(client: Socket, payload: any): Promise<void> {
    const param = {
      latitude: payload.latitude,
      longitude: payload.longitude,
    };

    console.log('location-to-user', param);
    this.server.emit(`ferry-location-to-user ${payload.ferry_no}`, param);
    // await this.routeService.updateRoute(param, payload.route_id);
  }

  @SubscribeMessage('driver-connect')
  async createRoom(client: Socket, payload: any) {
    await this.routeService.createNewRoute(payload);
    this.server.emit(`driver-route-id ${payload.ferry_no}`, true);
  }

  @SubscribeMessage('user-connect')
  connectRoom(client: Socket, payload: any) {
    console.log('Connected User : ', payload);
    client.join(payload.socket_id);
  }

  @SubscribeMessage('driver-stop-location')
  async endRoom(client: Socket, payload: any) {
    console.log('Disconnect socket id : ', payload);
    client.leave(payload.socket_id);
    // this.server.to(payload.socket_id).disconnectSockets();
    const param = {
      is_active: false,
      datetime: payload.datetime,
    };
    console.log('params', param);
    await this.routeService.driverStopLocation(param, payload.socket_id);
    console.log('params', param);
    this.server.emit(`disconnect-driver ${payload.socket_id}`, {
      msg: 'disconnect-driver',
    });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
