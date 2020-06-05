import {Component, OnInit} from '@angular/core';
import {DataStoreService} from 'src/app/core/services/data-store.service';

@Component({
  selector: 'app-room-code',
  templateUrl: './room-code.component.html',
  styleUrls: ['./room-code.component.scss']
})
export class RoomCodeComponent implements OnInit {
  roomCode: string;

  constructor(private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.roomCode = this.dataStore.getRoomCode();
  }

}
