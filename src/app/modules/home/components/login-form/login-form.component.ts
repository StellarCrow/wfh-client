import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { AuthService } from "../../../../core/services/auth/auth.service";
import { AlertService } from "../../../../core/services/alert/alert.service";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  registerForm: FormGroup;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  selectedTabIndex: number;

  constructor(
    private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    this.selectedTabIndex = 1;
    if (this.authService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilderLogin.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.registerForm = this.formBuilderRegister.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get getRegisterControls() {
    return this.registerForm.controls;
  }

  get getLoginControls() {
    return this.loginForm.controls;
  }

  register() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log("register");
    // this.loading = true;
    this.authService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (!data.success) {
            this.alertService.error(data.error.message);
          } else {
            console.log("success");
            this.alertService.success("Registration successful", true);
            this.selectedTabIndex = 0;

            //TODO move to separate method
            this.registerForm = this.formBuilderRegister.group({
              firstName: ["", Validators.required],
              lastName: ["", Validators.required],
              email: ["", Validators.required],
              password: ["", [Validators.required, Validators.minLength(6)]]
            });
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  login() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // this.loading = true;
    this.authService
      .login(
        this.getLoginControls.email.value,
        this.getLoginControls.password.value
      )
      .pipe(first())
      .subscribe(
        data => {
          if (!data.success) {
            this.alertService.error(data.error.message);
          } else {
            // this.router.navigate([this.returnUrl]);
            this.router.navigate(["welcome"]);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  tabChanged(event: MatTabChangeEvent) {}
}
