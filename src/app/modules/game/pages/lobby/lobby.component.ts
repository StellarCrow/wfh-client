import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SocketService} from '../../services/socket.service';
import {ISocket} from '../../interfaces/isocket';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {IPlayer} from '../../../../shared/interfaces/iplayer';
import {AudioService} from '../../services/audio.service';
import {audiofiles} from '../../../../../environments/environment';
import {LocalStorageService} from 'src/app/core/services/local-storage.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent implements OnInit, OnDestroy {
  @ViewChild('sidebar') sidebar: ElementRef;
  public users: IPlayer[] = [];

  public roomCode: string;

  public errorMessage: string;

  public username: string;
  public avatar: string;

  public gameReady: boolean;

  public notifier = new Subject();
  public waveHeight: number;
  public elementsCount: number;

  constructor(
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private router: Router,
    private audioService: AudioService,
    private lSS: LocalStorageService
  ) {
    this.roomCode = this.dataStore.getRoomCode();
    this.username = this.dataStore.getUserName();
    this.avatar = this.lSS.getItem('user').avatar;
    this.waveHeight = 5;
    this.elementsCount = Math.floor(window.innerHeight / this.waveHeight);
  }

  ngOnInit(): void {
    this.audioService.setAudio(audiofiles.lobby);
    this.dataStore.users$
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.users = data;
      });
    this.configSocketListeners();
    this.socketService.emit('new-user', { username: this.username, room: this.roomCode, avatar: this.avatar });
  }

  private configSocketListeners(): void {
    this.listenUserConnected();
    this.listenGameStarted();
    this.listenReconnectUser();
    this.listenUserDisconnected();
    this.listenUserLeftRoom();
    this.listenErrorEvent();
  }

  private listenUserConnected(): void {
    this.socketService.listen('new-user-connected')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        const users = [...data.payload];
        this.dataStore.setRoomsUsers(users);
        this.checkGameStatus();
      });
  }

  private listenGameStarted(): void {
    this.socketService.listen('game-started')
      .pipe(takeUntil(this.notifier))
      .subscribe((data) => this.router.navigate(['game/play', this.roomCode], { state: { fromLobby: true, toPlay: true } }));
  }

  private listenReconnectUser(): void {
    this.socketService.listen('reconnect-user')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        const users = [...data.payload];
        this.dataStore.setRoomsUsers(users);
        this.checkGameStatus();
      });
  }

  private listenUserLeftRoom(): void {
    this.socketService.listen('user-left-room')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        const users = [...data.payload.users];
        this.dataStore.setRoomsUsers(users);
        this.checkGameStatus();
        if (data.payload.creator) {
          this.router.navigate(['/main/welcome'], { state: { roomDeleted: true } });
        }
      });
  }

  private listenUserDisconnected(): void {
    this.socketService.listen('user-disconnected')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        const users = this.users.filter(
          (user: IPlayer) => user.username !== data.payload.username,
        );
        this.dataStore.setRoomsUsers(users);
        this.checkGameStatus();
      });
  }

  private listenErrorEvent(): void {
    this.socketService.listen('error-event')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        this.errorMessage = data.answer;
      });
  }

  public checkGameStatus() {
    this.gameReady = this.users.length < 3; // TODO: extract to constant
  }

  public startGame() {
    this.socketService.emit('start-game', { room: this.roomCode });
  }


  public ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
