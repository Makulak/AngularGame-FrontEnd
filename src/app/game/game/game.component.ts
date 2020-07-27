import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameService } from '../game.service';
import { HubService } from 'src/app/shared/hub.service';
import { WaitingRoomService } from 'src/app/waiting-room/waiting-room.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(private gameService: GameService,
              private waitingRoomService: WaitingRoomService,
              private hubService: HubService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const roomId: string = this.route.snapshot.paramMap.get('roomId');

    this.gameService.setConnection();
    this.hubService.startConnection();

    this.waitingRoomService.tryEnterRoom(roomId, null).catch(() => { // TODO: Password
      this.router.navigate(['/waiting-room']);
    });
  }

  ngOnDestroy(): void {
    this.waitingRoomService.leaveRoom();
  }
}
