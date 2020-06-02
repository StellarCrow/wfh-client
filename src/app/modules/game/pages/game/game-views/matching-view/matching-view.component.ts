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
  public currentPicture: number = 0;
  public currentPhrase: number = 0;

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
    this.listenCreateTee();

    // TODO: remove once we receive actual data from BE
    this.mockData();
  }

  // TODO: remove, same reason as above
  mockData(): void {
    this.pictures = [
      {url: 'assets/images/tee-img.jpg', created_by: 'peer1', background: 'rgb(95, 0, 0)'},
      {url: 'assets/images/tee-img2.jpg', created_by: 'peer2', background: 'rgb(34, 54, 24)'},
      {url: 'assets/images/tee-img3.jpg', created_by: 'peer3', background: 'rgb(35, 23, 70)'}
    ];
    this.phrases = [
      {phrase: 'Blad zakonav mene v mogylu', created_by: 'peer2'},
      {phrase: 'Applying for junior position at EPAM', created_by: 'peer1'},
      {phrase: 'Lol kek cheburek', created_by: 'peer3'}
    ];
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

  private listenCreateTee(): void {
    this.socketService.listen('new-tee-created')
      .pipe(takeUntil(this.notifier))
      .subscribe(({answer}) => {
        this.snackBar.open(answer, 'Close', {duration: 2000});
      });
  }

  submit(): void {
    this.resultTee = {
      picture: this.pictures[this.currentPicture],
      phrase: this.phrases[this.currentPhrase]
    };
    console.log(this.resultTee);

    // TODO: add 'create-tee' event in BE to receive the created tee
    this.socketService.emit('create-tee', {
      tee: this.resultTee,
      room: this.dataStore.getRoomCode(),
      userID: JSON.parse(localStorage.getItem('user'))._id,
    });
    this.actionService.registerAction();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
