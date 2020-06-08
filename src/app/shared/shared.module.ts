import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertComponent} from './components/alert/alert.component';
import {RouterModule} from '@angular/router';
import {ModalComponent} from './components/modal/modal.component';
import {TeeImageComponent} from './components/tee-image/tee-image.component';
import {ModalLeavePage} from './components/modal-leave-page/modal-leave-page';
import {ModalRoomDeletedComponent} from './components/modal-room-deleted/modal-room-deleted.component';
import {RouterUnderlinkComponent} from './components/router-underlink/router-underlink.component';
import { UnderlinkComponent } from './components/underlink/underlink.component';


@NgModule({
  declarations: [
    ModalComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    ModalLeavePage,
    TeeImageComponent,
    ModalRoomDeletedComponent,
    RouterUnderlinkComponent,
    UnderlinkComponent
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
    ModalComponent,
    TeeImageComponent,
    RouterUnderlinkComponent,
    UnderlinkComponent
  ]
})
export class SharedModule {
}
