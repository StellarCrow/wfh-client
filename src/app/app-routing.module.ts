import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'game',
    loadChildren: () =>
      import('./modules/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./modules/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
