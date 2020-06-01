import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../../../services/socket.service';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Stages} from '../../../../constants/stages.enum';
import {GameViewService} from '../../../../services/game-view.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ActionService} from '../../../../../../core/services/action.service';

@Component({
  selector: 'app-phrase-view',
  templateUrl: './phrase-view.component.html',
  styleUrls: ['./phrase-view.component.scss']
})
export class PhraseViewComponent implements OnInit, OnDestroy {
  private  room: string;
  public username: string;
  public phraseForm: FormGroup;
  private notifier = new Subject();


  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private gameViewService: GameViewService,
    private actionService: ActionService
  ) {
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.phrases);
    this.listenNewPhrase();
    this.room = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();

    this.phraseForm = this.formBuilder.group({
      phraseText: [
        '',
        [Validators.required, Validators.minLength(1)]
      ]
    });
  }

  private listenNewPhrase(): void {
    this.socketService.listen('new-phrase-saved')
      .pipe(takeUntil(this.notifier))
      .subscribe(({answer}) => {
        this.snackBar.open(answer, 'Close', {duration: 2000});
      });
  }


  public submitPhrase(): void {
    this.socketService.emit('new-phrase', {
      phrase: this.phraseForm.value.phraseText,
      room: this.room
    });
    this.phraseForm.setValue({phraseText: ''});
    this.actionService.registerAction();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
