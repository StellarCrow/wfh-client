import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class HideContentService {
  private sidenavArray = [];

  public setSidenav(sidenav: MatSidenav, id: string): void {
    this.sidenavArray.push({sidenav, id});
  }

  public toggle(id: string): void {
    const currentSidenav = this.sidenavArray.find((elem) => elem.id === id);
    currentSidenav.sidenav.toggle();
  }

  public removeSidenav(id: string) {
    this.sidenavArray = this.sidenavArray.filter(elem => elem.id !== id);
  }
}
