import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLogged) {
      return true;
    }

    this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
