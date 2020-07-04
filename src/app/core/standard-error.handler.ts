import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';
import { LoggerService } from './logger.service';
import { AlertService } from '../shared/alert.service';

@Injectable()
export class StandardErrorHandler implements ErrorHandler {

    constructor(private errorService: ErrorService,
                private loggerService: LoggerService,
                private alertService: AlertService) { }

    handleError(error: Error | HttpErrorResponse) {

        let message;

        if (error instanceof HttpErrorResponse) {
            message = this.errorService.getServerErrorMessage(error);
            this.alertService.showError(message);
        } else {
            message = this.errorService.getClientErrorMessage(error);
            this.alertService.showError(message);
        }
        this.loggerService.logError(message);
    }
}
