import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {

  public moveBackground(event: any) {
    const element = event.target as HTMLElement;
    element.style.backgroundPositionX = -event.offsetX / 15 + 'px';
    element.style.backgroundPositionY = -event.offsetY / 15 + 'px';
    element.style.backgroundSize = 'cover';
    console.log(event);
  }


}
