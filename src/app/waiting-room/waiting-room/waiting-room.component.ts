import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnectionState } from '@aspnet/signalr';

import { WaitingRoomService } from '../waiting-room.service';
import { HubService } from 'src/app/shared/hub.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  constructor(private hubService: HubService,
              private waitingRoomService: WaitingRoomService) { }

  ngOnInit(): void {
    this.waitingRoomService.setConnection();

    if (this.hubService.hubConnectionState === HubConnectionState.Disconnected) {
      this.hubService.startConnection().then(() => {
        this.waitingRoomService.enterWaitingRoom().then(() =>
          this.waitingRoomService.getRooms()
        );
      }
      );
    } else {
      this.waitingRoomService.enterWaitingRoom().then(() =>
        this.waitingRoomService.getRooms()
      );
    }
  }

  ngOnDestroy(): void {
    this.waitingRoomService.unsetConnection();
  }
}
