import {Component, OnInit} from '@angular/core';

import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {Stages} from '../../../../constants/stages.enum';
import {ITee} from 'src/app/modules/game/interfaces/itee';
import {SocketService} from 'src/app/modules/game/services/socket.service';
import {ActionService} from 'src/app/core/services/action.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-tee-vote-view',
  templateUrl: './tee-vote-view.component.html',
  styleUrls: ['./tee-vote-view.component.scss']
})
export class TeeVoteViewComponent implements OnInit {
  public hasVoted: boolean;

  public leftTee: ITee;
  public rightTee: ITee;

  constructor(
    private dataStore: DataStoreService,
    private socketService: SocketService,
    private actionService: ActionService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.setVotingStage();
    this.listenReceiveTeePair();
    this.initVote();

    this.socketService.listen('vote-sent').subscribe(({answer}) => {
      this.snackBar.open(answer, 'Close', {duration: 2000});
    });
  }

  private setVotingStage(): void {
    this.dataStore.setGameStage(Stages.voting);
    this.hasVoted = false;
  }

  private initVote(): void {
    this.socketService.emit('start-voting', {room: this.dataStore.getRoomCode()});
  }

  private listenReceiveTeePair() {
    this.socketService.listen('send-vote-tees').subscribe(({payload}) => {
      if (this.hasVoted) {
        console.log('Re-Setting the stage', this.hasVoted);
        this.setVotingStage();
      }

      console.log('received payload');
      console.log(payload)

      this.leftTee = payload[0];
      this.rightTee = payload[1];
    });
  }

  public voteForLeftTee(): void {
    this.submitVote(this.leftTee);
  }

  public voteForRightTee(): void {
    this.submitVote(this.rightTee);
  }

  private submitVote(winner: ITee) {
    this.hasVoted = true;
    const username = this.dataStore.getUserName();
    const room = this.dataStore.getRoomCode();

    this.socketService.emit('send-vote', {username, winner, room});
    this.actionService.registerAction();
  }
}
