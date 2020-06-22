import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private get baseUrl() {
    return environment.baseUrl + 'hub/rooms';
  }

  private hubConnection: HubConnection;

  constructor(private logger: LoggerService,
              private authService: AuthService) { }

  public setConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl, { accessTokenFactory: () => this.authService.Token })
      .build();

    this.hubConnection.on('onPlayerEnter', (data) => this.onPlayerEnter(data));
    this.hubConnection.on('onPlayerLeave', (data) => this.onPlayerLeave(data));
    this.hubConnection.on('onGetRooms', (data) => this.onGetRooms(data));
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        this.logger.logInformation('Room connection started');
        this.hubConnection.invoke('PlayerEntered');
        // this.hubConnection.invoke('GetRooms', [{skip: 0}, {take: 0}]);
      });
  }

  public stopConnection() {
    this.hubConnection.stop()
      .then(() => {
        this.logger.logInformation('Room connection stopped');
      });
  }

  private onPlayerEnter(data: any) {
    this.logger.logInformation(data);
  }

  private onPlayerLeave(data: any) {
    this.logger.logInformation(data);
  }

  private onGetRooms(data: any) {
    this.logger.logInformation(data);
  }
}
