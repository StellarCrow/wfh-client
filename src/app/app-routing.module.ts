import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./modules/home/components/login-form/login-form.component";
import { WelcomeComponent } from "./modules/home/components/welcome/welcome.component";
import { NotFoundComponent } from "./modules/home/components/not-found/not-found.component";
import { AuthGuard } from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "game",
    loadChildren: () =>
      import("./modules/game/game.module").then(m => m.GameModule)
  },
  // { path: "", component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginFormComponent },
  { path: "welcome", component: WelcomeComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
