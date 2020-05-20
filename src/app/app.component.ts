import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth/auth.service';
import { IUser } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wfh-client';
  currentUser: IUser;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
