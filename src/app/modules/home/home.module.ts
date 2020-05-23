import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './components/register-form/register-form.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule, FormsModule, ReactiveFormsModule
  ],
  exports: []

})
export class HomeModule { }
