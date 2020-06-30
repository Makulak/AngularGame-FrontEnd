import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WaitingRoomService } from '../waiting-room.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  constructor(private waitingRoomService: WaitingRoomService) { }

  ngOnInit(): void {
    this.waitingRoomService.setConnection();
    this.waitingRoomService.startConnection();
  }

  ngOnDestroy(): void {
    this.waitingRoomService.stopConnection();
  }
}
