import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private get baseUrl() {
    return environment.baseUrl + 'api/auth';
  }

  private token: string;

  public get Token() {
    return this.token;
  }

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
   }

  signIn(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/signin', {
      email,
      password
    }).pipe(map(response => {
      this.token = response.token;
      if (rememberMe) {
        localStorage.setItem('token', response.token);
      }
    }));
  }

  signOut() {
    this.token = null;
    localStorage.removeItem('token');
  }

  get isUserLogged(): boolean {
    return !!this.token;
  }
}
