import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { JoinRoomComponent } from './components/pages/join-room/join-room.component';


const routes: Routes = [
  {
    path: '',
    component: GameComponent,
  },
  {
    path: 'join-room',
    component: JoinRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule {
}
