import {
  Component, OnInit, ViewChild, AfterViewInit, OnDestroy,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { HideContentService } from '../../services/hide-content.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;

  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;

  constructor(private sidenavService:HideContentService) { }


  rightArrowShow=true;

  leftArrowShow=true;

  toggleDisplay(arrow: string) {
    if (arrow === 'rightArrowShow') {
      this.rightArrowShow = !this.rightArrowShow;
    } else if (arrow === 'leftArrowShow') {
      this.leftArrowShow = !this.leftArrowShow;
    }
  }

  closeArrow(closed: string) {
    if (closed === 'right') {
      this.rightArrowShow = !this.rightArrowShow;
    } else if (closed === 'left') {
      this.leftArrowShow = !this.leftArrowShow;
    }
  }

  public toggleSidenav(id: string): void {
    this.sidenavService.toggle(id);
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.leftSidenav, 'leftSidenav');
    this.sidenavService.setSidenav(this.rightSidenav, 'rightSidenav');
  }

  ngOnDestroy(): void {
    this.sidenavService.removeSidenav('leftSidenav');
    this.sidenavService.removeSidenav('rightSidenav');
  }
}
