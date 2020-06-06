import {Injectable, OnDestroy} from '@angular/core';
import {GameViewService} from '../../modules/game/services/game-view.service';
import {DONE} from '../../modules/game/constants/game-views';
import {SocketService} from '../../modules/game/services/socket.service';
import {DataStoreService} from './data-store.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionService implements OnDestroy {
  public usersActions = 0;
  private gameStage: string;
  private notifier = new Subject();

  constructor(
    private gameViewService: GameViewService,
    private socketService: SocketService,
    private dataStore: DataStoreService) {
    this.subscribeGameStage();
  }

  public registerAction() {
    this.usersActions++;

    let neededActions;
    if (this.gameStage === 'matching' || this.gameStage === 'voting') {
      neededActions = 1;
    } else {
      neededActions = 3;
    }

    if (this.usersActions === neededActions) {
      this.gameViewService.setCurrentView(DONE);
      this.socketService.emit(`finish-${this.gameStage}`, {room: this.dataStore.getRoomCode(), username: this.dataStore.getUserName()});
      this.usersActions = 0;
    }
  }

  private subscribeGameStage() {
    this.dataStore.getGameStage()
      .pipe(takeUntil(this.notifier))
      .subscribe(stage => this.gameStage = stage);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
