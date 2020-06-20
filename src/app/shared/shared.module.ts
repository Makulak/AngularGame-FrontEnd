import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ],
  exports: [
    TranslateModule
  ]
})
export class SharedModule { }
