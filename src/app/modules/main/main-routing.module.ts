import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AboutComponent} from './components/about/about.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthorizationInterceptor} from '../../core/interceptors/authorization.interceptor';
import {MainComponent} from './main.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'welcome', component: WelcomeComponent, pathMatch: 'full'},
      {path: 'about', component: AboutComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true}]
})
export class MainRoutingModule {
}
