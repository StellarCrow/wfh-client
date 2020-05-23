import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, AlertComponent],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    AlertComponent
  ]
})
export class SharedModule {
}
