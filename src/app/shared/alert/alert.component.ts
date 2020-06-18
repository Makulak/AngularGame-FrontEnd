import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert } from './alert.model';
import { AlertType } from './alert-type.enum';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  template: `
  <div *ngFor="let alert of alerts" [class]="getClass(alert)" class="alert-containter">
    <button class="alert-close" (click)="remove(alert)">&times;</button>
    <span class="alert-message" [innerHTML]="alert.message"></span>
  </div>
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'global-alert';
  @Input() allowMany = false;
  @Input() autocloseDuration = 5000;
  @Input() class = '';
  @Input() scrollableElementId: string;

  public alerts: Alert[] = [];

  private alertSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id).subscribe(alert => {
      if (!alert.message) {
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
        this.alerts.forEach(x => x.keepAfterRouteChange = false);
        return;
      }
      if (!this.allowMany) {
        this.alerts = [];
      }

      if (!alert.sticky) {
        this.scrollTop();
      }

      this.alerts.push(alert);

      if (alert.autoClose) {
        setTimeout(() => this.remove(alert), this.autocloseDuration);
      }
    });

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  remove(alert: Alert) {
    this.alerts.find(x => x === alert).fade = true;

    setTimeout(() => {
      this.alerts = this.alerts.filter(x => x !== alert);
    }, 250);
  }

  scrollTop() {
    if (!!this.scrollableElementId) { // If element is provided scroll only selected element, not window
      const element = document.getElementById(this.scrollableElementId);
      if (!!element) {
        element.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
  }

  getClass(alert: Alert): string {
    if (!alert) {
      return;
    }

    const classes = ['alert'];

    switch (alert && alert.type) {
      case AlertType.Success:
        classes.push('alert-success');
        break;
      case AlertType.Warning:
        classes.push('alert-warning');
        break;
      case AlertType.Error:
        classes.push('alert-danger');
        break;
    }

    if (alert.sticky) {
      classes.push('alert-sticky');
    }
    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ') + ' ' + this.class;
  }
}
