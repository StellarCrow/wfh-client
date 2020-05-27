import { Component, OnInit } from "@angular/core";
import { GameViewService } from "../../services/game-view.service";
import { Observable } from 'rxjs';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit {
  currentView: string;

  constructor(private gameViewService: GameViewService) {}

  ngOnInit(): void {
    this.initGameView();
  }

  initGameView(): void {
    this.gameViewService.currentView$.subscribe((view: string) => {
      this.currentView = view;
    });
  }
}
