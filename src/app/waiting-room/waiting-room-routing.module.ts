import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component';
import { LoggedGuard } from '../shared/logged.guard';

const routes: Routes = [{
  path: 'waiting-room',
  component: WaitingRoomComponent,
  canActivate: [LoggedGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingRoomRoutingModule { }
