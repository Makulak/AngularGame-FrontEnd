import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

import { environment } from 'src/environments/environment';
import { LoggerService } from '../core/logger.service';
import { AuthService } from '../shared/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Room } from './room.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WaitingRoomService {

  private get baseUrl() {
    return environment.baseUrl + 'hub/waiting-room';
  }

  private playerCountSubj: BehaviorSubject<number>;
  public playerCount$: Observable<number>;

  private roomsSubj: BehaviorSubject<Room[]>;
  public rooms$: Observable<Room[]>;

  private hubConnection: HubConnection;

  constructor(private logger: LoggerService,
              private authService: AuthService) {
    this.playerCountSubj = new BehaviorSubject<number>(undefined);
    this.playerCount$ = this.playerCountSubj.asObservable();

    this.roomsSubj = new BehaviorSubject<Room[]>(undefined);
    this.rooms$ = this.roomsSubj.asObservable();
  }

  public setConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.baseUrl, { accessTokenFactory: () => this.authService.Token })
      .build();

    this.hubConnection.on('updatePlayerCount', (data) => {
      this.onUpdatePlayerCount(data);
    });
    this.hubConnection.on('updateAllRooms', (data: any[]) => {
      const rooms = data.map(room => new Room().convertFrom(room));
      this.onUpdateAllRooms(rooms);
    });
    this.hubConnection.on('roomRemoved', (data) => {
      this.onRoomRemoved(data);
    });
    this.hubConnection.on('roomAdded', (data: Room) => {
      this.onRoomAdded(data);
    });
  }

  public startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        this.logger.logInformation('Room connection started');
      });
  }

  public stopConnection() {
    this.hubConnection.stop()
      .then(() => {
        this.logger.logInformation('Room connection stopped');
        this.playerCountSubj.next(undefined);
        this.roomsSubj.next(null);
      });
  }

  public addRoom(roomName: string, password: string) {
    this.hubConnection.invoke('AddRoom', roomName, password);
  }

  public removeRoom(roomName: string) {
    this.hubConnection.invoke('RemoveRoom', roomName);
  }

  private onUpdatePlayerCount(data: any) {
    const count = data.count;

    this.logger.logInformation(count);
    this.playerCountSubj.next(count);
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
