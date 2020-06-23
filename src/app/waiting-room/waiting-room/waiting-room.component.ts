import { Component, OnInit, OnDestroy } from '@angular/core';
import { WaitingRoomService } from '../waiting-room.service';
import { Subscription } from 'rxjs';
import { Room } from '../room.model';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss']
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  playersCountSub: Subscription;
  playersCount: number;

  roomsSub: Subscription;
  rooms: Room[];

  roomName: string;

  constructor(private waitingRoomService: WaitingRoomService) { }

  ngOnInit(): void {
    this.playersCountSub = this.waitingRoomService.playerCount$.subscribe(count => {
        this.playersCount = count;
    });

    this.roomsSub = this.waitingRoomService.rooms$.subscribe(rooms => {
      this.rooms = Object.assign([], rooms);
    });

    this.waitingRoomService.setConnection();
  }

  ngOnDestroy(): void {
    this.playersCountSub.unsubscribe();
    this.roomsSub.unsubscribe();
  }

  start() {
    this.waitingRoomService.startConnection();
  }

  stop() {
    this.waitingRoomService.stopConnection();
  }

  addRoom() {
    this.waitingRoomService.addRoom(this.roomName);
  }

  removeRoom(name: string) {
    this.waitingRoomService.removeRoom(name);
  }
}
