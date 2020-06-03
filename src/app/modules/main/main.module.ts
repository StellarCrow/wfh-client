import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalJoinRoomComponent } from './components/modal-join-room/modal-join-room.component';
import { FormJoinRoomComponent } from './components/form-join-room/form-join-room.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormUploadFileComponent } from './components/form-upload-file/form-upload-file.component';


@NgModule({
  declarations: [
    MainComponent,
    WelcomeComponent,
    AboutComponent,
    FormJoinRoomComponent,
    ModalJoinRoomComponent,
    SettingsComponent,
    FormUploadFileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LazyLoadImageModule,
  ],
})
export class MainModule {
}
