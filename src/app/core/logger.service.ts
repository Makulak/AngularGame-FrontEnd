import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public logError(message: string) {
    // TODO: Better way to log errors
    console.log('Error: ' + message);
  }
}
