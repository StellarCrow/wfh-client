import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GameRoutingModule} from './game-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {ChatComponent} from './components/chat/chat.component';


@NgModule({
  declarations: [LobbyComponent, ChatComponent],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    FormsModule
  ]
})
export class GameModule {
}
