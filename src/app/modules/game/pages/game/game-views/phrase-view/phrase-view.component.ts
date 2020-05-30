import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../../../services/socket.service';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Stages} from '../../../../constants/stages.enum';
import {GameViewService} from '../../../../services/game-view.service';
import {DONE} from '../../../../constants/game-views';

@Component({
  selector: 'app-phrase-view',
  templateUrl: './phrase-view.component.html',
  styleUrls: ['./phrase-view.component.scss']
})
export class PhraseViewComponent implements OnInit {
  private readonly room: string;
  private readonly finishedUsers: string[];
  public username: string;
  public roomCode: string;
  public phraseForm: FormGroup;
  public phraseCounter = 0;


  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private gameViewService: GameViewService
  ) {
    this.room = this.dataStore.getRoomCode();
    this.finishedUsers = this.dataStore.getFinishedUsers();
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.phrases);
    this.listenNewPhrase();
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();

    this.phraseForm = this.formBuilder.group({
      phraseText: [
        '',
        [Validators.required, Validators.minLength(1)]
      ]
    });
  }

  private listenNewPhrase(): void {
    this.socketService.listen('new-phrase-saved').subscribe(({answer}) => {
      this.snackBar.open(answer, 'Close', {duration: 2000});
    });
  }



  public submitPhrase(): void {
    this.socketService.emit('new-phrase', {
      phrase: this.phraseForm.value.phraseText,
      room: this.roomCode,
      userID: JSON.parse(localStorage.getItem('user'))._id,
    });
    this.phraseForm.setValue({phraseText: ''});
    this.phraseCounter++;
    if (this.phraseCounter === 3) {
      this.gameViewService.setCurrentView(DONE);
      this.socketService.emit('finish-phrases', {room: this.room, username: this.dataStore.getUserName()});
    }
  }


}
