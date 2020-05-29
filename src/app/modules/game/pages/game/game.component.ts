import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {HideContentService} from '../../services/hide-content.service';
import {GameViewService} from '../../services/game-view.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {PHRASE} from '../../constants/game-views';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;
  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;


  constructor(
    private sidenavService: HideContentService,
    private gameViewService: GameViewService,
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private snackBar: MatSnackBar) {
  }

  currentView: string;

  private notifier = new Subject();

  rightArrowShow = true;

  leftArrowShow = true;

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
    this.listenStopPainting();
    this.listenUserFinishPainting();
    this.listenNotification();
    this.initGameView();
  }


  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.leftSidenav, 'leftSidenav');
    this.sidenavService.setSidenav(this.rightSidenav, 'rightSidenav');
  }

  ngOnDestroy(): void {
    this.sidenavService.removeSidenav('leftSidenav');
    this.sidenavService.removeSidenav('rightSidenav');
    this.notifier.next();
    this.notifier.complete();
  }

  private listenUserFinishPainting() {
    this.socketService.listen('user-finish-painting')
      .pipe(takeUntil(this.notifier))
      .subscribe(({payload}) => {
        this.dataStore.setFinishedUser(payload);
        if (this.userIsLast()) {
          console.log('Im last');
          this.socketService.emit('all-finish-painting', {room: this.dataStore.getRoomCode()});
          return;
        }
      });
  }

  private listenStopPainting(): void {
    this.socketService.listen('stop-painting')
      .pipe(takeUntil(this.notifier))
      .subscribe(_ => {
        console.log('all finished');
        this.gameViewService.currentView = PHRASE;
        this.dataStore.clearFinishedUsers();
      });
  }

  private listenNotification() {
    this.socketService.listen('image-saved')
      .pipe(takeUntil(this.notifier))
      .subscribe(({answer}) => this.snackBar.open(answer, 'Close', {duration: 2000}));
  }

  initGameView(): void {
    this.gameViewService.currentView$
      .pipe(takeUntil(this.notifier))
      .subscribe((view: string) => {
        this.currentView = view;
      });
  }

  private userIsLast(): boolean {
    const userIsLast = this.dataStore.getUserName() === this.dataStore.getFinishedUsers().slice().pop();
    const allUsersFinished = this.dataStore.getFinishedUsers().length === this.dataStore.getRoomsUsers().length;
    return allUsersFinished && userIsLast;
  }
}
