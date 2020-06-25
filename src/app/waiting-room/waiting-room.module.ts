import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { WaitingRoomRoutingModule } from './waiting-room-routing.module';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { WaitingRoomFiltersComponent } from './waiting-room-filters/waiting-room-filters.component';


@NgModule({
  declarations: [WaitingRoomComponent, RoomListComponent, WaitingRoomFiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    TranslateModule,

    WaitingRoomRoutingModule
  ]
})
export class WaitingRoomModule { }
