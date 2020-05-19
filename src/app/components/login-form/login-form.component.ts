import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { IUser } from "./../../core/models/user";
import { AuthService } from "./../../core/service/auth/auth.service";
import { AlertService } from "./../../core/service/alert/alert.service";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService
  ) {
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
    this.loading = true;
    this.authService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success("Registration successful", true);
          this.router.navigate(["/login"]);
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

    console.log("start login");

    this.loading = true;
    this.authService
      .login(
        this.getLoginControls.email.value,
        this.getLoginControls.password.value
      )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
