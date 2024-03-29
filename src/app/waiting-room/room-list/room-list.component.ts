import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Room } from '../room.model';
import { WaitingRoomService } from '../waiting-room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit, OnDestroy {

  roomsSub: Subscription;
  rooms: Room[];

  constructor(private waitingRoomService: WaitingRoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.roomsSub = this.waitingRoomService.rooms$.subscribe(rooms => {
      this.rooms = Object.assign([], rooms);
    });
  }

  ngOnDestroy(): void {
    this.roomsSub.unsubscribe();
  }

  roomSelected(roomId: string) {
    this.waitingRoomService.tryEnterRoom(roomId, null).then(() => // TODO: Password
      this.router.navigate(['game/' + roomId])
    );
  }
}
