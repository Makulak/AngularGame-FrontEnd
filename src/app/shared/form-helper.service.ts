import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor() { }

  getErrorMessage(control: AbstractControl): string {
    if (!control.hasError) {
      return '';
    }

    if (control.errors.required) {
      return 'Field is required';
    } else if (control.errors.email) {
      return 'Filed is not correct email address';
    } else if (control.errors.mustMatch) {
      return 'Fileds do not match';
    }
  }
}
