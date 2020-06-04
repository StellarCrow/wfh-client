import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {GameViewService} from '../../services/game-view.service';
import {MATCHING, PHRASE, TEE_VOTE, TEE_RESULT} from '../../constants/game-views';
import {Stages} from '../../constants/stages.enum';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  private readonly loadedUsers: string [];
  private notifier = new Subject();
  public subscription: Subscription;
  public duration: number;
  public gameStage: string;
  public timerStarts = false

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private gameViewService: GameViewService) {
    this.loadedUsers = this.dataStore.getLoadedUsers();
  }

  ngOnInit(): void {
    this.initStage();
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
      this.timerStarts = false;
    }
  }

  private listenStopEvent(event, nextView): void {
    this.socketService.listen(event)
      .pipe(takeUntil(this.notifier))
      .subscribe(_ => {
        this.gameViewService.currentView = nextView;
        this.dataStore.clearFinishedUsers();
        this.startTimer(75);
      });
  }

  private startTimer(duration: number): void {
    this.duration = duration;
    if (!this.timerStarts) {
      this.timerStarts = true;
      this.subscription = interval(1000).subscribe(t => {
        this.startCount();
      });
    }
  }

  private listenStartTimer(): void {
    this.socketService.listen('all-users-loaded').subscribe(_ => {
      this.startTimer(75);
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
      .subscribe(stage => this.gameStage = stage);
  }

  private finishStage(gameStage: string) {
    if (this.dataStore.userIsLast(this.loadedUsers)) {
      return this.socketService.emit(`all-finish-${gameStage}`, {room: this.dataStore.getRoomCode()});
    }
  }
}
