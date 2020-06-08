import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {GameViewService} from '../../services/game-view.service';
import {MATCHING, PHRASE, TEE_RESULT, TEE_VOTE} from '../../constants/game-views';
import {Stages} from '../../constants/stages.enum';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  private readonly loadedUsers: string [];

  private notifier = new Subject();

  public subscription: Subscription;

  public duration: number;

  public gameStage: string;

  public timerState: boolean;

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private gameViewService: GameViewService,
  ) {
    this.loadedUsers = this.dataStore.getLoadedUsers();
  }

  ngOnInit(): void {
    this.initStage();
    this.listenTimerState();
    this.listenStartTimer();
    this.listenStopEvent('stop-painting', PHRASE);
    this.listenStopEvent('stop-phrases', MATCHING);
    this.listenStopEvent('stop-matching', TEE_VOTE);
    this.listenStopEvent('continue-voting', TEE_VOTE);
    this.listenStopEvent('stop-voting', TEE_RESULT);
  }

  startCount(): void {
    this.duration -= 1;
    if (this.duration === 0) {
      this.subscription.unsubscribe();
      this.finishStage(this.gameStage);
      this.dataStore.setTimerState(false);
    }
  }

  private listenStopEvent(event, nextView): void {
    this.socketService.listen(event)
      .pipe(takeUntil(this.notifier))
      .subscribe((_) => {
        this.gameViewService.setCurrentView = nextView;
        this.dataStore.clearFinishedUsers();
        if (this.gameViewService.getCurrentView === 'tee-vote-view') {
          this.startTimer(20);
          return;
        }
        this.startTimer(100);
      });
  }

  private startTimer(duration: number): void {
    this.duration = duration;
    if (!this.timerState) {
      this.dataStore.setTimerState(true);
      this.subscription = interval(1000).subscribe((t) => {
        this.startCount();
      });
    }
  }

  private listenStartTimer(): void {
    this.socketService.listen('all-users-loaded').subscribe((_) => {
      this.startTimer(100000);
      this.dataStore.setGameStage(Stages.painting);
    });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
    this.subscription.unsubscribe();
  }


  private initStage(): void {
    this.dataStore.gameStage.pipe(takeUntil(this.notifier))
      .subscribe((stage) => this.gameStage = stage);
  }

  private finishStage(gameStage: string) {
    if (this.dataStore.userIsLast(this.loadedUsers)) {
      return this.socketService.emit(`all-finish-${gameStage}`, {room: this.dataStore.getRoomCode()});
    }
  }

  private listenTimerState(): void {
    this.dataStore.getTimerState()
      .subscribe(state => this.timerState = state);
  }
}
