import {
  AfterViewInit, Component, OnInit, Output, EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocketService } from '../../services/socket.service';
import { IChatMessage } from '../../interfaces/ichat-message';
import { DataStoreService } from '../../../../core/services/data-store.service';
import { HideContentService } from '../../services/hide-content.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages: IChatMessage[] = [];

  public roomCode: string;

  public username: string;

  public chatForm: FormGroup;

  constructor(private socketService: SocketService,
    private dataStore: DataStoreService,
    private formBuilder: FormBuilder,
    private sidenavService:HideContentService) {
  }

  @Output() hideComponent = new EventEmitter<string>();

  public toggleSidenav(id): void {
    this.sidenavService.toggle(id);
    this.hideComponent.emit('right');
  }

  ngOnInit(): void {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();
    this.listenNewMessage();
    this.chatForm = this.formBuilder.group({
      messageText: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
    });
  }

  public listenNewMessage(): void {
    this.socketService.listen('chat-message')
      .subscribe(({ payload }) => {
        this.messages = [...this.messages, { username: payload.username, message: payload.message }];
      });
  }

  public sendMessage(): void {
    const newMessage = this.chatForm.value.messageText;
    this.messages.push({ username: 'You', message: newMessage });
    this.socketService.emit('new-chat-message', {
      message: newMessage,
      room: this.roomCode,
      username: this.username,
    });
    this.chatForm.setValue({ messageText: '' });
    this.scrollToEnd();
  }

  private scrollToEnd() {
    const container = document.querySelector('.chat__messenger');
    container.scrollTop = container.scrollHeight;
  }
}
