import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private translate: TranslateService) { }

  getClientErrorMessage(error: Error): string {
      if (!navigator.onLine) {
          return this.translate.instant('Info.NoInternetConnection');
      }
      if (environment.production) {
        return error.message ? error.message : error.toString();
      } else {
        return error.message;
      }
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
      return error.message; // TODO: Get error message
    }
}
