import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // TODO: Better way to log errors

  public logError(message: string) {
    console.log('Error: ' + message);
  }

  public logInformation(message: string) {
    console.log('Info: ' + message);
  }
}
