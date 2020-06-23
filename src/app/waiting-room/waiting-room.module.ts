import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';


@NgModule({
  declarations: [WaitingRoomComponent],
  imports: [
    CommonModule,
    FormsModule,

    WaitingRoomRoutingModule
  ]
})
export class WaitingRoomModule { }
