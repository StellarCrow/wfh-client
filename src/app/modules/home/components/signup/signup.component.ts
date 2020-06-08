import {
  Component, EventEmitter, OnInit, Output, ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from '../../../../core/services/alert.service';
import { IRegisterResponse } from '../../../../shared/interfaces/iregister-response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Output() signupEvent = new EventEmitter();

  @ViewChild('videoSignUp') video;

  public signupForm: FormGroup;

  public loading = false;

  public submitted = false;

  constructor(
    private formBuilderSignup: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
  }

  public playVideo() {
    this.video.nativeElement.play();
  }

  public ngOnInit() {
    this.signupForm = this.formBuilderSignup.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  get getSignupControls() {
    return this.signupForm.controls;
  }

  public signup() {
    this.submitted = true;
    this.alertService.clear();

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.registerUser(this.signupForm.value)
      .subscribe(
        (data: IRegisterResponse) => {
          if (!data.success) {
            this.alertService.error(data.error.message);
          } else {
            this.alertService.success('Registration successful', true);
            this.signupSuccess();
          }
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      );
  }

  signupSuccess() {
    this.signupEvent.emit();
  }
}
