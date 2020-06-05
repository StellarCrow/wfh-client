import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameEnterGuard implements CanActivate {
  constructor(
    private router: Router,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.router.getCurrentNavigation());
    const isFromLobby = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.fromLobby;
    if (isFromLobby) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
