import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {RouterModule} from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [ModalComponent, HeaderComponent, FooterComponent, AlertComponent],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ModalComponent
  ]
})
export class SharedModule {
}
