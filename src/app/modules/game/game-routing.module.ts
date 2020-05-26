import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LobbyComponent} from './pages/lobby/lobby.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../../core/interceptors/authorization.interceptor';

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}]
})
export class GameRoutingModule {
}
