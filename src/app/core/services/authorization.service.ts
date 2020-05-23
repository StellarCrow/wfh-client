import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public helper: JwtHelperService = new JwtHelperService();
  constructor() { }

  public isAuthorized(): any {
    return !this.helper.isTokenExpired(localStorage.getItem('token'));
  }
}
