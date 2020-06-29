import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  private get baseUrl() {
    return environment.baseUrl + 'hub/tic-tac-toe';
  }

  private hubConnection: HubConnection;

  constructor(private logger: LoggerService,
              private authService: AuthService) {
  }

  public setConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl, { accessTokenFactory: () => this.authService.Token })
      .build();
  }

  public startConnection() {
    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection
      .start()
      .then(() => {
        this.logger.logInformation('TicTacToe connection started');
      });
  }

  public stopConnection() {
    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection.stop()
      .then(() => {
        this.logger.logInformation('TicTacToe connection stopped');
      });
  }
}
