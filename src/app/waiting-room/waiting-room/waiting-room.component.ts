import { Component, OnInit, OnDestroy } from '@angular/core';

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
    this.hubService.startConnection().then(() =>
      this.waitingRoomService.getRooms()
    );
  }

  ngOnDestroy(): void {
    this.hubService.stopConnection();
  }
}
