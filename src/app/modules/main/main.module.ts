import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AboutComponent} from './components/about/about.component';
import {MaterialModule} from '../../shared/material/material.module';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    WelcomeComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule {
}
