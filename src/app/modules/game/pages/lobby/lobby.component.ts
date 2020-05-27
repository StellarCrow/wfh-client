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

    this.socketService.emit('new-user', {username: this.username, room: this.roomCode});
  }

  private configSocketListeners(): void {
    this.listenUserConnected();
    this.listenGameStarted();
    this.listenReconnectUser();
    this.listenUserDisconnected();
    this.listenErrorEvent();
  }

  private listenUserConnected(): void {
    this.socketService.listen('new-user-connected').subscribe((data: ISocket) => {
      this.users = [...data.payload];
      this.checkGameStatus();
      this.dataStore.setRoomsUsers(this.users);
    });
  }

  private listenGameStarted(): void {
    this.socketService.listen('game-started').subscribe((data) => this.router.navigate(['game/play']));
  }

  private listenReconnectUser(): void {
    this.socketService.listen('reconnect-user').subscribe((data: ISocket) => {
      this.users = [...data.payload];
      this.checkGameStatus();
      this.dataStore.setRoomsUsers(this.users);
    });
  }

  private listenUserDisconnected(): void {
    this.socketService.listen('user-disconnected').subscribe((data: ISocket) => {
      this.users = this.users.filter(
        (username: string) => username !== data.payload.username
      );
      this.checkGameStatus();
      this.dataStore.setRoomsUsers(this.users);
    });
  }

  private listenErrorEvent(): void {
    this.socketService.listen('error-event').subscribe((data: ISocket) => {
      this.errorMessage = data.answer;
    });
  }

  public checkGameStatus() {
    this.gameReady = this.users.length < 3;
  }

  public startGame() {
    this.socketService.emit('start-game', {room: this.roomCode});
  }

}
