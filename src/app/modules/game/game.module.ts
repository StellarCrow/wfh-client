import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LazyLoadImageModule} from 'ng-lazyload-image';
import {GameRoutingModule} from './game-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {ChatComponent} from './components/chat/chat.component';
import {VideoComponent} from './components/video/video.component';
import {GameComponent} from './pages/game/game.component';
import {CanvasComponent} from './components/canvas/canvas.component';
import {CanvasBackgroundComponent} from './components/canvas-background/canvas-background.component';
import {PencilColorsComponent} from './components/pencil-colors/pencil-colors.component';
import {TimerComponent} from './components/timer/timer.component';
import {DrawViewComponent} from './pages/game/game-views/draw-view/draw-view.component';
import {PhraseViewComponent} from './pages/game/game-views/phrase-view/phrase-view.component';
import {TeeVoteViewComponent} from './pages/game/game-views/tee-vote-view/tee-vote-view.component';
import {TeeResultViewComponent} from './pages/game/game-views/tee-result-view/tee-result-view.component';
import {PlayersListComponent} from './components/players-list/players-list.component';
import {DoneViewComponent} from './pages/game/game-views/done-view/done-view.component';
import {MatchingViewComponent} from './pages/game/game-views/matching-view/matching-view.component';
import {RoomCodeComponent} from './components/room-code/room-code.component';
import {TeeComponent} from './components/tee/tee.component';
import {TeeImageComponent} from './components/tee-image/tee-image.component';
import {RepeatElementPipe} from './pipes/repeat-element.pipe';
import {GameCoreComponent} from './game-core.component';


@NgModule({
  declarations: [
    LobbyComponent,
    ChatComponent,
    VideoComponent,
    GameComponent,
    CanvasComponent,
    CanvasBackgroundComponent,
    PencilColorsComponent,
    TimerComponent,
    DrawViewComponent,
    PhraseViewComponent,
    TeeVoteViewComponent,
    TeeResultViewComponent,
    PlayersListComponent,
    DoneViewComponent,
    MatchingViewComponent,
    PlayersListComponent,
    RoomCodeComponent,
    GameCoreComponent,
    TeeComponent,
    TeeImageComponent,
    RepeatElementPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
  ],
})
export class GameModule {
}
