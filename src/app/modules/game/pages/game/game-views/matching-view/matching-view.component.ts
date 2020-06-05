import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {Stages} from '../../../../constants/stages.enum';
import {IPicture} from 'src/app/modules/game/interfaces/ipicture';
import {IPhrase} from 'src/app/modules/game/interfaces/iphrase';
import {ITee} from 'src/app/modules/game/interfaces/itee';
import {SocketService} from 'src/app/modules/game/services/socket.service';
import {ActionService} from 'src/app/core/services/action.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-matching-view',
  templateUrl: './matching-view.component.html',
  styleUrls: ['./matching-view.component.scss']
})
export class MatchingViewComponent implements OnInit, OnDestroy {
  public pictures: IPicture[] = [];
  public phrases: IPhrase[] = [];
  public resultTee: ITee;
  public currentPicture = 0;
  public currentPhrase = 0;

  private notifier = new Subject();

  constructor(
    private dataStore: DataStoreService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private actionService: ActionService
  ) {
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.matching);
    this.listenTeeCreated();
    this.listenPairsCreated();
    this.initCreatePairs();
  }

  previousPicture(): void {
    if (this.currentPicture > 0) {
      this.currentPicture -= 1;
    }
  }

  nextPicture(): void {
    if (this.currentPicture < this.pictures.length - 1) {
      this.currentPicture += 1;
    }
  }

  previousPhrase(): void {
    if (this.currentPhrase > 0) {
      this.currentPhrase -= 1;
    }
  }

  nextPhrase(): void {
    if (this.currentPhrase < this.phrases.length - 1) {
      this.currentPhrase += 1;
    }
  }

  private initCreatePairs(): void {
    this.socketService.emit('create-pairs', {room: this.dataStore.getRoomCode()});
  }

  private listenTeeCreated(): void {
    this.socketService.listen('new-tee-created')
      .pipe(takeUntil(this.notifier))
      .subscribe(({answer}) => {
        this.snackBar.open(answer, 'Close', {duration: 2000});
      });
  }

  private listenPairsCreated(): void {
    this.socketService.listen('pairs-created').subscribe(({payload}) => {
      this.pictures = payload.map(item => item.picture);
      this.phrases = payload.map(item => item.phrase);
    });
  }

  submit(): void {
    const picture = this.pictures[this.currentPicture];
    const phrase = this.phrases[this.currentPhrase];
    this.resultTee = {picture, phrase};

    this.socketService.emit('new-tee', {
      tee: this.resultTee,
      room: this.dataStore.getRoomCode()
    });
    this.actionService.registerAction();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
