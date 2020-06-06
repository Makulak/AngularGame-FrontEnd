import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports: [SignInComponent]
})
export class UserModule { }
