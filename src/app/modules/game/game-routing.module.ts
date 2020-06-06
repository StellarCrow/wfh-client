import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {GameComponent} from './pages/game/game.component';
import {GameCoreComponent} from './game-core.component';
import {GameLeaveGuard} from '../../core/guards/game-leave/game-leave.guard';
import {GameEnterGuard} from '../../core/guards/game-enter/game-enter.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lobby',
    pathMatch: 'full'
  },
  {
    path: '',
    component: GameCoreComponent,
    children: [
      {path: 'lobby/:id', component: LobbyComponent, pathMatch: 'full'},
      {path: 'play/:id', component: GameComponent, canDeactivate: [GameLeaveGuard], canActivate: [GameEnterGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
