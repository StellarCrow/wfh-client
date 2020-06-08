import {Component, OnInit} from '@angular/core';
import {GameViewService} from 'src/app/modules/game/services/game-view.service';
import * as views from 'src/app/modules/game/constants/game-views.js';

@Component({
  selector: 'app-draw-view',
  templateUrl: './draw-view.component.html',
  styleUrls: ['./draw-view.component.scss']
})
export class DrawViewComponent implements OnInit {
  constructor(private gameViewService: GameViewService) {
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    this.gameViewService.setCurrentView = views.PHRASE;
  }
}
