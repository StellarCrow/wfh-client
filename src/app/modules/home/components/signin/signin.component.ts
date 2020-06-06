import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {AlertService} from '../../../../core/services/alert.service';
import {ILoginResponse} from '../../../../shared/interfaces/i-login-response';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {SIGNINBACKGROUND, SIGNINBACKGROUND_HD} from '../../constants/backgrounds';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;

  public loading = false;

  public submitted = false;

  public defaultBackground = SIGNINBACKGROUND;

  public highResBackground = SIGNINBACKGROUND_HD;

  constructor(
    private formBuilderSignin: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private dataStore: DataStoreService,
  ) {
  }

  public ngOnInit() {
    this.signinForm = this.formBuilderSignin.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  get getSigninControls() {
    return this.signinForm.controls;
  }

  public signin() {
    const email = this.getSigninControls.email.value;
    const password = this.getSigninControls.password.value;

    this.submitted = true;
    this.alertService.clear();

    if (this.signinForm.invalid) {
      return;
    }
    this.authService.loginUser(email, password).subscribe(
      (data: ILoginResponse) => {
        if (!data.success) {
          return this.alertService.error(data.error.message);
        }
        this.setItemsToLocalStorage(data);
        this.dataStore.setCurrentUser(data.payload.userData);
        this.router.navigate(['main/welcome']);
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      },
    );
  }

  private setItemsToLocalStorage(data: ILoginResponse) {
    const user = data.payload.userData;
    if (user && user.password) {
      delete user.password;
    }
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('firstName', JSON.stringify(data.payload.userData.firstName));
    localStorage.setItem('token', JSON.stringify(data.payload.token));
  }
}
