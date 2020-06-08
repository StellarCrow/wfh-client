import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {LocalStorageService} from '../services/local-storage.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('token');
    if (token) {
      const request = req.clone({ setHeaders: { Authorization: token } });
      return next.handle(request);
    }
    return next.handle(req);
  }
}


