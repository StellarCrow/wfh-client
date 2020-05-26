import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {GameRoutingModule} from './game-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {ChatComponent} from './components/chat/chat.component';
import { VideoComponent } from './components/video/video.component';
import { GameComponent } from './pages/game/game.component';


@NgModule({
  declarations: [LobbyComponent, ChatComponent, VideoComponent, GameComponent],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    FormsModule
  ]
})
export class GameModule {
}
