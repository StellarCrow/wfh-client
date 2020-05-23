import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {AuthorizationService} from '../services/authorization.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authorizationService: AuthorizationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         if (this.authorizationService.isAuthorized()) {
           return true;
         }
         this.router.navigate(['/login']);
         return false;
    }
}
