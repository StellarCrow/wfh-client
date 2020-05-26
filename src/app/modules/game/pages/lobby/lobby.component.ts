import { Component, OnInit } from "@angular/core";
import { SocketService } from "../../services/socket.service";
import { ISocket } from "../../interfaces/isocket";
import { DataStoreService } from "../../../../core/services/data-store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.scss"]
})
export class LobbyComponent implements OnInit {
  public users: string[] = [];
  public roomCode: string;
  public errorMessage: string;
  public username: string;
  public gameStarted: boolean;

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private router: Router
  ) {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();
    this.gameStarted = false;
  }

  ngOnInit(): void {
    this.configSocketListeners();
  }

  private configSocketListeners(): void {
    this.socketService.listen('new-user-connected').subscribe((data: ISocket) => {
      this.users = [...data.payload];
      if (this.users.length >= 3 && this.users.length <= 6) {
        this.gameStarted = true;
      }
    });
    this.socketService.listen('reconnect-user').subscribe((data: ISocket) => {
      this.users = [...data.payload];
    });
    this.socketService.emit('new-user', {username: this.username, room: this.roomCode});
    this.socketService.listen('user-disconnected').subscribe((data: ISocket) => {
      this.users = this.users.filter(
        (username: string) => username !== data.payload.username
      );
    });
    this.socketService
      .listen("user-disconnected")
      .subscribe((data: ISocket) => {
        this.users = this.users.filter(
          (username: string) => username !== data.payload.username
        );
      });

    this.socketService.listen("error-event").subscribe((data: ISocket) => {
      this.errorMessage = data.answer;
    });
  }

  public startGame() {
    this.gameStarted = true;
    this.router.navigate(["/game/play"]);
  }
  // }

  // TODO: handle answer.message with alert/notification service
}
