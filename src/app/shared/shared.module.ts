import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
