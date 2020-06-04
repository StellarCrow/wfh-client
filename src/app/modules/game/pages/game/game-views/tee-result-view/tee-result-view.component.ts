import { Component, OnInit } from '@angular/core';
import { GameViewService } from 'src/app/modules/game/services/game-view.service';
import * as views from 'src/app/modules/game/constants/game-views.js';

@Component({
  selector: 'app-tee-result-view',
  templateUrl: './tee-result-view.component.html',
  styleUrls: ['./tee-result-view.component.scss']
})
export class TeeResultViewComponent implements OnInit {
  constructor(private gameViewService: GameViewService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    // TODO: add game logic to jump back to tee-voting if there are tee pairs left
    // or go to scoreboard page / finish the game otherwise
    this.gameViewService.setCurrentView(views.TEE_RESULT);
  }
}
