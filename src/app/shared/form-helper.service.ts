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
    }
  }
}
