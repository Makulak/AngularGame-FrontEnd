import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
              private hubService: HubService,
              private router: Router) {
    this.roomsSubj = new BehaviorSubject<Room[]>(undefined);
    this.rooms$ = this.roomsSubj.asObservable();
  }

  public setConnection() {
    this.hubService.hubConnection.on('updateRoomsList', (data: any[]) => {
      const rooms = data.map(room => new Room().convertFrom(room));
      this.updateRoomsList(rooms);
    });
    this.hubService.hubConnection.on('removeRoomFromList', (data: any) => {
      this.removeRoomFromList(data);
    });
    this.hubService.hubConnection.on('addRoomToList', (data: any) => {
      const room = new Room().convertFrom(data);
      this.addRoomToList(room);
    });
    this.hubService.hubConnection.on('tryEnterCreatedRoom', (data: any) => {
      this.navigateToRoom(data.roomId);
    });
  }

  public enterWaitingRoom(): Promise<void> {
    return this.hubService.hubConnection.invoke('EnterWaitingRoom');
  }

  public getRooms(): Promise<void> {
    return this.hubService.hubConnection.invoke('GetRooms');
  }

  public createRoom(roomName: string, password: string): Promise<void> {
    return this.hubService.hubConnection.invoke('CreateRoom', { name: roomName, password } );
  }

  public removeRoom(roomId: number): Promise<void> {
    return this.hubService.hubConnection.invoke('RemoveRoom', roomId);
  }

  private updateRoomsList(data: Room[]) {
    this.logger.logInformation(JSON.stringify(data));
    this.roomsSubj.next(data);
  }

  private addRoomToList(data: Room) {
    this.logger.logInformation(JSON.stringify(data));
    let rooms = Object.assign([], this.roomsSubj.value);
    if (!rooms) {
      rooms = [];
    }
    rooms.push(data);

    this.roomsSubj.next(rooms);
  }

  private removeRoomFromList(data: any) {
    this.logger.logInformation(JSON.stringify(data));
    const rooms = Object.assign([], this.roomsSubj.value.filter(room => room.id !== data.roomId));

    this.roomsSubj.next(rooms);
  }

  private navigateToRoom(roomId: number) {
    this.router.navigate(['game/' + roomId]);
  }
}
