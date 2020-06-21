import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(private translate: TranslateService) { }

  getErrorMessage(control: AbstractControl): string {
    if (!control.hasError) {
      return '';
    }

    if (control.errors.required) {
      return this.translate.instant('Info.FieldIsRequired');
    } else if (control.errors.email) {
      return this.translate.instant('Info.FieldIsNotEmail');
    } else if (control.errors.mustMatch) {
      return this.translate.instant('Info.FieldsDoNotMatch');
    }
  }
}
