import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {LoginFormComponent} from './components/login-form/login-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginFormComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class HomeRoutingModule {
}
