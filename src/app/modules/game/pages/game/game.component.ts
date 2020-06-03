import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {HideContentService} from '../../services/hide-content.service';
import {GameViewService} from '../../services/game-view.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataStoreService} from '../../../../core/services/data-store.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('leftSidenav') public leftSidenav: MatSidenav;
  @ViewChild('rightSidenav') public rightSidenav: MatSidenav;


  private readonly loadedUsers: string[];
  private readonly finishedUsers: string[];
  private gameStage: string;
  public readonly room: string;


  constructor(
    private sidenavService: HideContentService,
    private gameViewService: GameViewService,
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private snackBar: MatSnackBar) {
    this.loadedUsers = this.dataStore.getLoadedUsers();
    this.finishedUsers = this.dataStore.getFinishedUsers();

    this.room = this.dataStore.getRoomCode();
  }

  currentView: string;

  private notifier = new Subject();

  isHideButtonRight = false;

  isHideButtonLeft = false;

  public toggleArrow(arrow: string) {
    if (arrow === 'rightArrow') {
      this.isHideButtonRight = !this.isHideButtonRight;
    } else if (arrow === 'leftArrow') {
      this.isHideButtonLeft = !this.isHideButtonLeft;
    }
  }

  public toggleSidenav(id: string): void {
    this.sidenavService.toggle(id);
  }

  ngOnInit(): void {
    this.subscribeGameStage();
    this.listenUserLoaded();
    this.listenNotification('image-saved');
    this.listenNotification('new-tee-created');
    this.initGameView();
    this.listenUserFinishAction('user-finish-painting');
    this.listenUserFinishAction('user-finish-phrases');
    this.listenUserFinishAction('user-finish-matching');
  }


  ngAfterViewInit(): void {
    this.socketService.emit('user-loaded', {
      room: this.room,
      username: this.dataStore.getUserName()
    });
    this.sidenavService.setSidenav(this.leftSidenav, 'leftSidenav');
    this.sidenavService.setSidenav(this.rightSidenav, 'rightSidenav');
  }

  ngOnDestroy(): void {
    this.sidenavService.removeSidenav('leftSidenav');
    this.sidenavService.removeSidenav('rightSidenav');
    this.notifier.next();
    this.notifier.complete();
  }

  private subscribeGameStage() {
    this.dataStore.getGameStage()
      .pipe(takeUntil(this.notifier))
      .subscribe(stage => this.gameStage = stage);
  }

  private listenUserLoaded(): void {
    this.socketService.listen('new-user-loaded')
      .pipe(takeUntil(this.notifier))
      .subscribe(({payload}) => {
        this.dataStore.setLoadedUsers(payload);
        if (this.dataStore.userIsLast(this.loadedUsers)) {
          this.socketService.emit('all-loaded', {room: this.room});
        }
      });

  }


  private listenUserFinishAction(event: string) {
    this.socketService.listen(event)
      .subscribe(({payload}) => {
        this.dataStore.setFinishedUser(payload);
        if (this.dataStore.userIsLast(this.finishedUsers)) {
          this.socketService.emit(`all-finish-${this.gameStage}`, {room: this.room});
        }
      });
  }

  private listenNotification(event) {
    this.socketService.listen(event)
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
}
