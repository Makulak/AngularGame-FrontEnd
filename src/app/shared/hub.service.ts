import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../core/logger.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HubService {

  private get baseUrl(): string {
    return environment.baseUrl + 'hub/potato';
  }

  private _hubConnection: HubConnection;
  public get hubConnection(): HubConnection {
    return this._hubConnection;
  }

  public get hubConnectionState(): HubConnectionState {
    return this.hubConnection?.state;
  }

  constructor(private logger: LoggerService,
              private authService: AuthService) {

    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl, { accessTokenFactory: () => this.authService.Token })
      .build();
  }

  public startConnection(): Promise<void> {
    if (this.hubConnectionState === HubConnectionState.Connected) {
      return null;
    }

    return this.hubConnection
      .start()
      .then(() => {
        this.logger.logInformation('Hub connection started');
      });
  }

  public stopConnection() {
    if (this.hubConnectionState === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection.stop()
      .then(() => {
        this.logger.logInformation('Room connection stopped');
      });
  }
}
