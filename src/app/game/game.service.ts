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
}
