import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';
import { LoggedGuard } from '../shared/logged.guard';

const routes: Routes = [{
  path: 'rooms',
  component: TestComponent,
  canActivate: [LoggedGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
