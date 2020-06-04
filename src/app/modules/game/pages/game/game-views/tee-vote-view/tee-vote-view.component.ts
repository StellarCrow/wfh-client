import { Component, OnInit } from '@angular/core';

import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {Stages} from '../../../../constants/stages.enum';
import {ITee} from 'src/app/modules/game/interfaces/itee';
import {SocketService} from 'src/app/modules/game/services/socket.service';
import {ActionService} from 'src/app/core/services/action.service';

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
    private actionService: ActionService
  ) {}

  ngOnInit(): void {
    this.setVotingStage();
    this.listenReceiveTeePair();
    this.initVote();
  }

  private setVotingStage(): void {
    this.dataStore.setGameStage(Stages.voting);
    this.hasVoted = false;
  }

  private initVote(): void {
    this.socketService.emit('start-voting', {room: this.dataStore.getRoomCode()});
  }

  private listenReceiveTeePair() {
    this.socketService.listen('send-vote-tees').subscribe(({answer, payload}) => {
      console.log(answer);
      if (this.hasVoted) {
        console.log('Setting new stage, since hasvoted is', this.hasVoted);
        this.setVotingStage();
      }

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

  private submitVote(winner) {
    this.hasVoted = true;
    const username = this.dataStore.getUserName();
    const room = this.dataStore.getRoomCode();

    this.socketService.emit('send-vote', {username, winner, room});
    this.actionService.registerAction();
  }
}
