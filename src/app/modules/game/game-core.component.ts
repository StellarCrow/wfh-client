import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-game-core',
  templateUrl: './game-core.component.html',
  styleUrls: ['./game-core.component.scss']
})
export class GameCoreComponent {

  constructor() {
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.preventDefault();
    return $event.returnValue = false;
  }

}
