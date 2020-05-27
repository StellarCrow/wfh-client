import { Component, OnInit, OnDestroy } from "@angular/core";
import { GameViewService } from "../../services/game-view.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
})
export class GameComponent implements OnInit, OnDestroy {
  currentView: string;
  private notifier = new Subject();

  constructor(private gameViewService: GameViewService) {}

  ngOnInit(): void {
    this.initGameView();
  }

  initGameView(): void {
    this.gameViewService.currentView$
      .pipe(takeUntil(this.notifier))
      .subscribe((view: string) => {
        this.currentView = view;
      });
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
