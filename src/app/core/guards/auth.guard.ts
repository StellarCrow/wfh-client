import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthorizationService} from '../services/authorization.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authorizationService.isAuthorized()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
