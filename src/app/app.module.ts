import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./shared/material/material.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { LoginFormComponent } from "./modules/home/components/login-form/login-form.component";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { JwtInterceptor } from "./core/interceptors/jwt.interceptor";
import { AlertComponent } from "./modules/home/components/alert/alert.component";
import { NotFoundComponent } from './modules/home/components/not-found/not-found.component';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AlertComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
