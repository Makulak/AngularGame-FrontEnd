import { AlertType } from './alert-type.enum';

export class Alert {
  componentId: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  keepAfterRouteChange: boolean;
  sticky: boolean;
  fade: boolean;

  constructor(init?: Partial<Alert>) {
      Object.assign(this, init);
  }
}
