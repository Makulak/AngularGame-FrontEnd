import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { SharedModule } from '../shared/shared.module';

import { WaitingRoomControlsComponent } from './waiting-room-controls/waiting-room-controls.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { RoomListComponent } from './room-list/room-list.component';

@NgModule({
  declarations: [
    WaitingRoomComponent,
    RoomListComponent,
    WaitingRoomControlsComponent
  ],
  imports: [
    CommonModule,

    SharedModule,
    WaitingRoomRoutingModule
  ]
})
export class WaitingRoomModule { }
