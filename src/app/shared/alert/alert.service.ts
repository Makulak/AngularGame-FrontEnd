import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { Alert } from './alert.model';
import { AlertType } from './alert-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultComponentId = 'global-alert';

  public onAlert(id = this.defaultComponentId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter(x => x && x.componentId === id));
  }

  public success(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  public error(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  public warning(message: string, options?: any) {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  public clear(id = this.defaultComponentId) {
    this.subject.next(new Alert({componentId: this.defaultComponentId}));
  }

  private alert(alertModel: Alert) {
    alertModel.componentId = alertModel.componentId || this.defaultComponentId;
    this.subject.next(alertModel);
  }
}
