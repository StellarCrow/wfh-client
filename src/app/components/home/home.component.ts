import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "./../../core/services/auth/auth.service";
import { IUser } from "./../../core/models/user";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  currentUser: IUser;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
