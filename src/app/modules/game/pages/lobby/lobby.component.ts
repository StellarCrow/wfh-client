import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {ISocket} from '../../interfaces/isocket';
import {DataStoreService} from '../../../../core/services/data-store.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  public users: string[];
  public roomCode: string;
  public errorMessage: string;

  constructor(private socketService: SocketService, private dataStore: DataStoreService) {
    this.roomCode = this.dataStore.getRoomCode();
    this.users = [this.dataStore.getUserName()];
  }

  ngOnInit(): void {
    this.configSocketListeners();
  }

  private configSocketListeners(): void {
    this.socketService.listen('room-created').subscribe((data: ISocket) => {
      this.users = [...this.users, data.payload.username];
    });

    this.socketService.listen('new-user-connected').subscribe((data: ISocket) => {
      this.users = data.payload;
    });

    this.socketService.listen('user-disconnected').subscribe((data: ISocket) => {
      this.users = this.users.filter(
        (username: string) => username !== data.payload.username
      );
    });
    
    this.socketService.listen('error-event').subscribe((data: ISocket) => {
      this.errorMessage = data.answer
    });
  }

  // TODO: handle answer.message with alert/notification service
}
