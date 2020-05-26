import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {ISocket} from '../../interfaces/isocket';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public users: string[] = [];
  public roomCode: string;
  public errorMessage: string;
  public username: string;
  public gameReady: boolean;

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private router: Router
  ) {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();

  }

  ngOnInit(): void {
    this.configSocketListeners();
  }

  private configSocketListeners(): void {
    this.socketService.listen('new-user-connected').subscribe((data: ISocket) => {
      this.users = [...data.payload];
      this.checkGameStatus();
    });
    this.socketService.listen('reconnect-user').subscribe((data: ISocket) => {
      this.users = [...data.payload];
      this.checkGameStatus();
    });
    this.socketService.emit('new-user', {username: this.username, room: this.roomCode});
    this.socketService.listen('user-disconnected').subscribe((data: ISocket) => {
      this.users = this.users.filter(
        (username: string) => username !== data.payload.username
      );
      this.checkGameStatus();
    });

    this.socketService.listen('error-event').subscribe((data: ISocket) => {
      this.errorMessage = data.answer;
    });
  }

  public checkGameStatus() {
    this.gameReady = this.users.length < 3;
  }
  public startGame() {

  }

}
