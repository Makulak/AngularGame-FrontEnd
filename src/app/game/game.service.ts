import { Injectable } from '@angular/core';

import { LoggerService } from '../core/logger.service';
import { HubService } from '../shared/hub.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private logger: LoggerService,
              private hubService: HubService) {
  }

  public setConnection() {
    this.hubService.hubConnection.on('', (data: any) => {
    });
  }

  public tryEnterGame(roomId: string, password: string = null): Promise<void> {
    this.logger.logInformation('Entering game');
    return this.hubService.hubConnection.invoke('tryEnterGame', roomId, password);
  }
}
