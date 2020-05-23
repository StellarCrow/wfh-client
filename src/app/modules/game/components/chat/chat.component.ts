import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import {ISocket} from '../../interfaces/isocket';
import {IChatMessage} from '../../interfaces/ichat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  newMessage: string;
  messages: IChatMessage[] = [];
  roomCode: string;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.roomCode = this.getRoomCode();
    this.listenNewMessage();
  }

  getRoomCode(): string {
    // return this.socketService.chatRoomName; // TODO: get room code from service
    return 'xxxx';
  }

  listenNewMessage(): void {
    this.socketService.listen('chat-message').subscribe(({payload} ) => {
      this.messages = [...this.messages, {username: payload.username, message: payload.message}];
    });
  }

  sendMessage(): void {
    this.messages.push({ username: 'You', message: this.newMessage });
    this.socketService.emit('new-chat-message', {
      message: this.newMessage,
      code: this.roomCode,
    });
  }
}
