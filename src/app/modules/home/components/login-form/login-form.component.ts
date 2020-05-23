import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil} from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {IloginResponse} from '../../../../shared/interfaces/ilogin-response';
import {IRegisterResponse} from '../../../../shared/interfaces/iregister-response';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {Subject, } from 'rxjs';
import {IUser} from '../../../../shared/interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {
  public  registerForm: FormGroup;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public  returnUrl: string;
  public selectedTabIndex: number;
  private currentUser: IUser;
  private notifier = new Subject();

  constructor(
    private formBuilderLogin: FormBuilder,
    private formBuilderRegister: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private dataStore: DataStoreService,


  ) {
    this.selectedTabIndex = 1;
    this.dataStore.getCurrentUser()
      .pipe(takeUntil(this.notifier))
      .subscribe((user: IUser) => this.currentUser = user);
    if (this.currentUser) {
      this.router.navigate(['/']);
    }
  }

  public ngOnInit() {
    this.loginForm = this.formBuilderLogin.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    });

    // this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.registerForm = this.formBuilderRegister.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    });
  }

  get getRegisterControls() {
    return this.registerForm.controls;
  }

  get getLoginControls() {
    return this.loginForm.controls;
  }

  public register() {
    this.submitted = true;
    this.alertService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .registerUser(this.registerForm.value)
      .subscribe(
        (data: IRegisterResponse) => {
          if (!data.success) {
            this.alertService.error(data.error.message);
          } else {
            this.alertService.success('Registration successful', true);
            this.selectedTabIndex = 0;
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  public login() {
    const email = this.getLoginControls.email.value;
    const password =  this.getLoginControls.password.value;

    this.submitted = true;
    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.loginUser( email, password)
      .subscribe(
        (data: IloginResponse) => {
          if (!data.success) {
           return  this.alertService.error(data.error.message);
          }
          localStorage.setItem('token', data.payload);
          this.router.navigate(['main/welcome']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
  tabChanged(event: MatTabChangeEvent) {}

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
