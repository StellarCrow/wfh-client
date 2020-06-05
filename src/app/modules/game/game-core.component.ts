import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';
import {DataStoreService} from '../../core/services/data-store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ISocket} from './interfaces/isocket';

@Component({
  selector: 'app-game-core',
  templateUrl: './game-core.component.html',
  styleUrls: ['./game-core.component.scss']
})
export class GameCoreComponent implements OnInit, OnDestroy {
  public notifier = new Subject();

  constructor(private socketService: SocketService, private dataStore: DataStoreService) {
  }

  ngOnInit(): void {
    this.listenUserLeft();
  }

  private listenUserLeft() {
    this.socketService.listen('user-left-room')
      .pipe(takeUntil(this.notifier))
      .subscribe((data: ISocket) => {
        this.dataStore.setRoomsUsers([...data.payload]);
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.preventDefault();
    return $event.returnValue = false;
  }

  public ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
