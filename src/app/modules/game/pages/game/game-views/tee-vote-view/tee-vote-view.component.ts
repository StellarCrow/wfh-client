import { Component, OnInit } from '@angular/core';
import { GameViewService } from 'src/app/modules/game/services/game-view.service';
import * as views from 'src/app/modules/game/constants/game-views.js';

@Component({
  selector: 'app-tee-vote-view',
  templateUrl: './tee-vote-view.component.html',
  styleUrls: ['./tee-vote-view.component.scss']
})
export class TeeVoteViewComponent implements OnInit {
  constructor(private gameViewService: GameViewService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.gameViewService.setCurrentView(views.TEE_RESULT);
  }
}
