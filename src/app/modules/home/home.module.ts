import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { AlertComponent } from "./components/alert/alert.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterFormComponent } from './components/register-form/register-form.component';


@NgModule({
  declarations: [WelcomeComponent, AboutComponent, HeaderComponent, FooterComponent, LoginFormComponent, AlertComponent, RegisterFormComponent],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule, FormsModule, ReactiveFormsModule
  ],
  exports: []

})
export class HomeModule { }
