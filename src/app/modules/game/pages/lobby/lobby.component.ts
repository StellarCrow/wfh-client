import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit {
  users: string[] = [];
  code: string;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.createRoom();

    this.listenConnectUser();
  }

  private createRoom(): void {
    this.code = 'abcd' || this.generateRoomCode(4);
    this.socketService.emit('create-room', {
      username: 'Vanko',
      code: this.code,
    });
  }

  // Generates room of length <codeLength> (must be an even number),
  // that consists of [0-9a-z]
  private generateRoomCode(codeLength): string {
    const dec2alphanum = (dec) => ('0' + dec.toString(36)).substr(-2);

    const arr = new Uint8Array((codeLength + 1) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2alphanum).join('');
  }

  listenConnectUser() {
    // TODO: create ISocketAnswer
    // TODO: handle answer.message with alert/notification service
    this.socketService.listen('new-user-connected').subscribe((data: any) => {
      this.users = [...this.users, data.payload.username];
    });
  }

  listenDisconnectUser() {
    this.socketService.listen('user-disconnected').subscribe((data: any) => {
      this.users = this.users.filter(
        (username: string) => username !== data.payload.username
      );
    });
  }
}
