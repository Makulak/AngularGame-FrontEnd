import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnectionState } from '@aspnet/signalr';

import { GameService } from '../game.service';
import { HubService } from 'src/app/shared/hub.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService,
              private hubService: HubService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const roomId: number = +this.route.snapshot.paramMap.get('roomId');

    this.gameService.setConnection();

    if (this.hubService.hubConnectionState === HubConnectionState.Disconnected) {
      this.hubService.startConnection().then(() =>
      this.tryEnterGame(roomId)
      );
    } else {
      this.tryEnterGame(roomId);
    }
  }

  tryEnterGame(roomId: number) {
    this.gameService.tryEnterGame(roomId).catch((reason) => {
      this.router.navigate(['waiting-room']);
      throw reason;
    });
  }

}
