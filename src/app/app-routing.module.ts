import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginFormComponent },
  { path: "home", component: HomeComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
