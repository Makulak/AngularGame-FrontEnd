import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) {
  }

  public showSuccess(message: string) {
    this.snackBar.open(message, 'X', {
    }).onAction().subscribe(_ => this.snackBar.dismiss());
  }

  public showError(message: string) {
    this.snackBar.open(message, 'X', {
    }).onAction().subscribe(_ => this.snackBar.dismiss());
  }
}
