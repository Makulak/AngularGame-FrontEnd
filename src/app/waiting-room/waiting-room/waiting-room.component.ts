import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WaitingRoomService } from '../waiting-room.service';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  playersCountSub: Subscription;
  playersCount: number;

  roomName: string;
  roomPassword: string;

  constructor(private waitingRoomService: WaitingRoomService) { }

  ngOnInit(): void {
    this.playersCountSub = this.waitingRoomService.playerCount$.subscribe(count => {
        this.playersCount = count;
    });
    this.waitingRoomService.setConnection();
  }

  ngOnDestroy(): void {
    this.playersCountSub.unsubscribe();
  }

  start() {
    this.waitingRoomService.startConnection();
  }

  stop() {
    this.waitingRoomService.stopConnection();
  }

  addRoom() {
    this.waitingRoomService.addRoom(this.roomName, this.roomPassword);
  }

  removeRoom(name: string) {
    this.waitingRoomService.removeRoom(name);
  }
}
