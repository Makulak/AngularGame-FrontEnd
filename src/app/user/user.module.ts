import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RequestResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    UserRoutingModule,
    SharedModule
  ],
  exports: []
})
export class UserModule { }
