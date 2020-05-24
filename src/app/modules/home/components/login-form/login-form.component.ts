import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { DataStoreService } from "../../../../core/services/data-store.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  public selectedTabIndex: number;

  constructor(private router: Router, private dataStore: DataStoreService) {
    this.selectedTabIndex = 1;

    if (this.dataStore.getCurrentUser()) {
      this.router.navigate(["/"]);
    }
  }

  public ngOnInit() {}

  tabChanged(event: MatTabChangeEvent) {}

  moveToSigninTab() {
    this.selectedTabIndex = 0;
  }
}
