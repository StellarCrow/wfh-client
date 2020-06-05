import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './components/modal/modal.component';
import { ModalLeavePage } from './components/modal-leave-page/modal-leave-page';
import { ModalRoomDeletedComponent } from './components/modal-room-deleted/modal-room-deleted.component';


@NgModule({
  declarations: [
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ModalLeavePage,
    ModalRoomDeletedComponent
  ],
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
