import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { LoggerService } from '../core/logger.service';
import { Room } from './room.model';
import { HubService } from '../shared/hub.service';

@Injectable({
  providedIn: 'root'
})
export class WaitingRoomService {

  private roomsSubj: BehaviorSubject<Room[]>;
  public rooms$: Observable<Room[]>;

  constructor(private logger: LoggerService,
              private hubService: HubService) {
    this.roomsSubj = new BehaviorSubject<Room[]>(undefined);
    this.rooms$ = this.roomsSubj.asObservable();
  }

  public setConnection() {
    this.hubService.hubConnection.on('updateAllRooms', (data: any[]) => {
      const rooms = data.map(room => new Room().convertFrom(room));
      this.onUpdateAllRooms(rooms);
    });
    this.hubService.hubConnection.on('removeRoom', (data: any) => {
      this.onRoomRemoved(data);
    });
    this.hubService.hubConnection.on('createRoom', (data: any) => {
      const room = new Room().convertFrom(data);
      this.onRoomAdded(room);
    });
  }

  public createRoom(roomName: string, password: string) {
    this.hubService.hubConnection.invoke('CreateRoom', { name: roomName, password } );
  }

  public removeRoom(roomId: number) {
    this.hubService.hubConnection.invoke('RemoveRoom', roomId);
  }

  public tryEnterRoom(roomId: number) {
    this.hubService.hubConnection.invoke('TryEnterRoom', roomId);
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
