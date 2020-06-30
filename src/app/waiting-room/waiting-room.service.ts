import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../shared/auth.service';
import { Room } from './room.model';
import { TicTacToeService } from './tic-tac-toe.service';

@Injectable({
  providedIn: 'root'
})
export class WaitingRoomService {

  private get baseUrl() {
    return environment.baseUrl + 'hub/waiting-room';
  }

  private roomsSubj: BehaviorSubject<Room[]>;
  public rooms$: Observable<Room[]>;

  private hubConnection: HubConnection;

  constructor(private logger: LoggerService,
              private authService: AuthService,
              private ticTacToeService: TicTacToeService) {
    this.roomsSubj = new BehaviorSubject<Room[]>(undefined);
    this.rooms$ = this.roomsSubj.asObservable();
  }

  public setConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl, { accessTokenFactory: () => this.authService.Token })
      .build();

    this.hubConnection.on('updateAllRooms', (data: any[]) => {
      const rooms = data.map(room => new Room().convertFrom(room));
      this.onUpdateAllRooms(rooms);
    });
    this.hubConnection.on('removeRoom', (data: any) => {
      this.onRoomRemoved(data);
    });
    this.hubConnection.on('createRoom', (data: any) => {
      const room = new Room().convertFrom(data);
      this.onRoomAdded(room);
    });
  }

  public startConnection() {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection
      .start()
      .then(() => {
        this.logger.logInformation('Room connection started');
      });
  }

  public stopConnection() {
    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection.stop()
      .then(() => {
        this.logger.logInformation('Room connection stopped');
        this.roomsSubj.next(null);
      });
  }

  public createRoom(roomName: string, password: string) {
    this.hubConnection.invoke('CreateRoom', { name: roomName, password } );
  }

  public removeRoom(roomId: number) {
    this.hubConnection.invoke('RemoveRoom', roomId);
  }

  public tryEnterRoom(roomId: number) {
    this.hubConnection.invoke('TryEnterRoom', roomId);
  }

  private onUpdateAllRooms(data: Room[]) {
    this.logger.logInformation(JSON.stringify(data));
    this.roomsSubj.next(data);
  }

  private onRoomAdded(data: Room) {
    this.logger.logInformation(JSON.stringify(data));
    let rooms = Object.assign([], this.roomsSubj.value);
    if (!rooms) {
      rooms = [];
    }
    rooms.push(data);

    this.roomsSubj.next(rooms);
  }

  private onRoomRemoved(data: any) {
    this.logger.logInformation(JSON.stringify(data));
    const rooms = Object.assign([], this.roomsSubj.value.filter(room => room.id !== data.roomId));

    this.roomsSubj.next(rooms);
  }
}
