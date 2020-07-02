import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { GameComponent } from './game/game.component';
import { LoggedGuard } from '../shared/logged.guard';

const routes: Routes = [{
  path: 'game/:roomId',
  component: GameComponent,
  canActivate: [LoggedGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
