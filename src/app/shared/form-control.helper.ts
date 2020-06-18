import { AbstractControl } from '@angular/forms';

export function getErrorMessageFromControl(control: AbstractControl): string {
  if (!control.hasError) {
    return '';
  }

  if (control.errors.required) {
    return 'Field is required';
  }
}
