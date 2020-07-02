import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService,
              private translate: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            return throwError(this.translate.instant('Info.ServerOffline'));
          } else if (error.status === 500) {
            if (environment.production) {
              return throwError(this.translate.instant('Info.InternalServerError'));
            } else {
              return throwError(this.errorService.getServerErrorMessage(error));
            }
          } else if (error.status === 401) {
            return throwError('401');
            // TODO: Handle this beter way
          } else if (error.status === 400 || error.status === 403 || error.status === 404) {
            const msg = this.errorService.getServerErrorMessage(error);
            if (!!msg) {
              return throwError(msg);
            } else {
              return throwError(this.translate.instant('Info.UnknownError'));
            }
          } else {
            return throwError(this.translate.instant('Info.UnknownError'));
          }
        } else {
          return throwError(this.translate.instant('Info.UnknownError'));
        }
      }));
  }
}
