import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from './../../../../core/services/auth/auth.service';
import { IUser } from './../../../../shared/interfaces/user';

@Component({
  selector: "app-home",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
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
