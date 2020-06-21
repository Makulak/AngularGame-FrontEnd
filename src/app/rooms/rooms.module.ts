import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { TestComponent } from './test/test.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,

    AngularMaterialModule
  ]
})
export class RoomsModule { }
