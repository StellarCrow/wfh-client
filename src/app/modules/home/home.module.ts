import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import { GoogleAuthButtonComponent } from './components/google-auth-button/google-auth-button.component';


@NgModule({
  declarations: [
    LoginFormComponent,
    SigninComponent,
    SignupComponent,
    GoogleAuthButtonComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],

})
export class HomeModule {
}
