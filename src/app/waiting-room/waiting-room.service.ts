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

  public selectedRoomId: string;

  constructor(private logger: LoggerService,
              private hubService: HubService,
              private router: Router) {
    this.roomsSubj = new BehaviorSubject<Room[]>(undefined);
    this.rooms$ = this.roomsSubj.asObservable();

    this.selectedRoomId = undefined;
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
    this.hubService.hubConnection.on('updateRoomOnList', (data: any) => {
      const room = new Room().convertFrom(data);
      this.updateRoomOnList(room);
    });
    this.hubService.hubConnection.on('navigateToRoom', (data: any) => {
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
    return this.hubService.hubConnection.invoke('CreateRoom', { name: roomName, password });
  }

  // public removeRoom(roomId: string): Promise<void> {
  //   return this.hubService.hubConnection.invoke('RemoveRoom', roomId);
  // }

  public tryEnterRoom(roomId: string, password: string = null): Promise<void> {
    this.logger.logInformation('Entering room: ' + this.selectedRoomId);
    return this.hubService.hubConnection.invoke('TryEnterRoom', roomId, password).then(() => {
      this.selectedRoomId = roomId;
    });
  }

  public leaveRoom(): Promise<void> {
    this.logger.logInformation('Leaving room: ' + this.selectedRoomId);
    return this.hubService.hubConnection.invoke('LeaveRoom', this.selectedRoomId).then(() => {
      this.selectedRoomId = undefined;
    });
  }

  private updateRoomsList(data: Room[]) {
    this.logger.logInformation('Updating: ' + JSON.stringify(data));
    this.roomsSubj.next(data);
  }

  private addRoomToList(data: Room) {
    this.logger.logInformation('Adding: ' + JSON.stringify(data));
    let rooms = Object.assign([], this.roomsSubj.value);
    if (!rooms) {
      rooms = [];
    }
    rooms.push(data);

    this.roomsSubj.next(rooms);
  }

  private removeRoomFromList(data: any) {
    this.logger.logInformation('Removing: ' + JSON.stringify(data));
    const rooms = Object.assign([], this.roomsSubj.value.filter(room => room.id !== data.roomId));

    this.roomsSubj.next(rooms);
  }

  private updateRoomOnList(data: Room) {
    this.logger.logInformation('Updating: ' + JSON.stringify(data));

    const rooms = Object.assign([], this.roomsSubj.value);
    const idx = rooms.findIndex((x) => x.id === data.id);

    if (idx !== -1) {
      rooms[idx] = Object.assign({}, data);
    }

    return rooms;
  }

  private navigateToRoom(roomId: string) {
    this.logger.logInformation('Navigate to room');
    this.tryEnterRoom(roomId, null).then(() => // TODO: Password after creating room
      this.router.navigate(['game/' + roomId])
    );
  }
}
