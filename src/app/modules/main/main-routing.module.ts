import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AuthGuard} from '../../core/guards/auth.guard';
import {AboutComponent} from './components/about/about.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../../core/interceptors/authorization.interceptor';


const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}]
})
export class MainRoutingModule {
}
