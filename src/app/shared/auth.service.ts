import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl + '/auth';

  private token: string;

  public get Token() {
    return this.token;
  }

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post(this.baseUrl + '/signin', {
      username,
      password
    }).pipe(map(response => {
      // TODO: Save token
    }));
  }

  logout() {
    this.token = null;
  }

  isUserLogged(): boolean {
    return !!this.token;
  }
}
