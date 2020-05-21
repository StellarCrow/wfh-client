import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { JoinRoomComponent } from './components/pages/join-room/join-room.component';
import { FormJoinRoomComponent } from './components/form-join-room/form-join-room.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [JoinRoomComponent, FormJoinRoomComponent],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    ReactiveFormsModule,
  ]
})
export class GameModule { }
