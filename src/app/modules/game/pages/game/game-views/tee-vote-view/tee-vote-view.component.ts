import { Component, OnInit } from '@angular/core';
import { GameViewService } from 'src/app/modules/game/services/game-view.service';
import * as views from 'src/app/modules/game/constants/game-views.js';


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
  selector: 'app-tee-vote-view',
  templateUrl: './tee-vote-view.component.html',
  styleUrls: ['./tee-vote-view.component.scss']
})
export class TeeVoteViewComponent implements OnInit {
  public leftTeeVotes: number = 0;
  public rightTeeVotes: number = 0;
  public isVoted: boolean = false;

  private notifier = new Subject();

  // public pictureLeft2: {picture: IPicture, phrase: IPhrase, created_by: string};

  public pictureLeft = {
    "picture" : { 
      "url":"https://wfh-test.s3.eu-north-1.amazonaws.com/pictures/6262/wm8sSQ7-CqWnzYKEAAAA.2.png",
      "created_by":"wm8sSQ7-CqWnzYKEAAAA",
      "background":"#5f0000"
    },
    "phrase" : {
      "phrase":"testovaya futbolka",
      "created_by":"8odsRkoX1XByZ5XqAAAB"
    },
    "created_by":"8odsRkoX1XByZ5XqAAAB"
  };
  public pictureRight = {
    "picture" : {
      "url":"https://wfh-test.s3.eu-north-1.amazonaws.com/pictures/6262/8odsRkoX1XByZ5XqAAAB.2.png",
      "created_by":"8odsRkoX1XByZ5XqAAAB",
      "background":"#223618"
    },
    "phrase" : {
      "phrase":"vlad konechno krasava",
      "created_by":"wm8sSQ7-CqWnzYKEAAAA"
    },
    "created_by":"wm8sSQ7-CqWnzYKEAAAA"
  };

  constructor(
    private gameViewService: GameViewService,

    private dataStore: DataStoreService,
    private snackBar: MatSnackBar,
    private socketService: SocketService,
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.matching);
    // this.listenTeeCreated();
    // this.listenPairsCreated();
    // this.initCreatePairs();
  }

  private initVote(): void {
    this.socketService.emit('start-vote', {room: this.dataStore.getRoomCode()});
  }

  private getTees() {
    this.socketService.listen('vote-tees').subscribe(({payload}) => {
      console.log(payload);
      // this.pictureLeft = payload.map(item => item[0]);
      // this.pictureRight = payload.map(item => item[1]);
    });
  }

  private sendVotes() {
    const votedTees = [
      {
        votes: this.leftTeeVotes, 
        tee: {
          picture: this.pictureLeft.picture.url, 
          phrase: this.pictureLeft.phrase.phrase, 
          created_by: this.pictureLeft.created_by
        }
      },
      {
        votes: this.rightTeeVotes, 
        tee: {
          picture: this.pictureRight.picture.url, 
          phrase: this.pictureRight.phrase.phrase,
          created_by: this.pictureRight.created_by
        }
      }
    ];

    // this.socketService.emit('vote-result', {votedTees, room: this.dataStore.getRoomCode()});
  }

  voteForLeftPicture(): void {
    if (this.isVoted) {
      return;
    }
    this.leftTeeVotes++;
    this.isVoted = true;
    this.sendVotes();
  }

  voteForRightPicture(): void {
    if (this.isVoted) {
      return;
    }
    this.rightTeeVotes++;
    this.isVoted = true;
    this.sendVotes();
  }

  handleSubmit(): void {
    this.gameViewService.setCurrentView(views.TEE_RESULT);
  }
}
