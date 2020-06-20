import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';

import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    UserRoutingModule,

    AngularMaterialModule,
    SharedModule
  ],
  exports: [SignInComponent]
})
export class UserModule { }
