import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
      if (!navigator.onLine) {
          return 'No Internet Connection';
      }
      if (environment.production) {
        return error.message ? error.message : error.toString();
      } else {
        return error.message + error.stack;
      }
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
      return error.message; // TODO: Get error message
    }
}
