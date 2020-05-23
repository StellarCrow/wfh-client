import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './pages/lobby/lobby.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../../core/interceptors/authorization.interceptor';

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }]
})
export class GameRoutingModule {}
