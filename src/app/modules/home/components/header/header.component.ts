import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../../../../core/services/auth/auth.service";
import { IUser } from "../../../../shared/interfaces/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  currentUser: IUser;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
