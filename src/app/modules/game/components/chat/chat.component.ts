import {Component, OnInit} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {IChatMessage} from '../../interfaces/ichat-message';
import {DataStoreService} from '../../../../core/services/data-store.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public  newMessage: string;
  public messages: IChatMessage[] = [];
  public  roomCode: string;
  public  username: string;

  constructor(private socketService: SocketService, private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();
    this.listenNewMessage();
  }

  listenNewMessage(): void {
    this.socketService.listen('chat-message')
      .subscribe(({payload}) => {
      this.messages = [...this.messages, {username: payload.username, message: payload.message}];
    });
  }

  sendMessage(): void {
    this.messages.push({username: 'You', message: this.newMessage});
    this.socketService.emit('new-chat-message', {
      message: this.newMessage,
      room: this.roomCode,
      username: this.username
    });
  }
}
