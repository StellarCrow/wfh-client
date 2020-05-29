import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {GameViewService} from '../../services/game-view.service';
import {PHRASE} from '../../constants/game-views';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  private readonly loadedUsers: string [];
  private notifier = new Subject();
  public subscription: Subscription;
  public duration = 75;

  constructor(private socketService: SocketService,
              private dataStore: DataStoreService,
              private gameViewService: GameViewService) {
    this.loadedUsers = this.dataStore.getLoadedUsers();
  }

  ngOnInit(): void {
    this.listenStartTimer();
    this.listenStopPainting();
  }

  startCount(): void {
    this.duration -= 1;
    if (this.duration === 0) {
      this.subscription.unsubscribe();
      if (this.userIsLast(this.loadedUsers)) {
        this.socketService.emit('all-finish-painting', {room: this.dataStore.getRoomCode()});
      }
    }
  }


  private listenStopPainting(): void {
    this.socketService.listen('stop-painting')
      .pipe(takeUntil(this.notifier))
      .subscribe(_ => {
        this.gameViewService.currentView = PHRASE;
        this.dataStore.clearFinishedUsers();
        this.subscription.unsubscribe();
      });
  }

  private startTimer(): void {
    this.subscription = interval(1000).subscribe(t => {
      this.startCount();
    });
  }

  private listenStartTimer(): void {
    this.socketService.listen('all-users-loaded').subscribe(_ => this.startTimer());
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.subscription.unsubscribe();
  }

  private userIsLast(array): boolean {
    const userIsLast = this.dataStore.getUserName() === array.slice().pop();
    const allUsersFinished = array.length === this.dataStore.getRoomsUsers().length;
    return allUsersFinished && userIsLast;
  }
}
