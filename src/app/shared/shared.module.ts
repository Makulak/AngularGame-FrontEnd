import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert/alert.component';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    AlertComponent
  ]
})
export class SharedModule { }
