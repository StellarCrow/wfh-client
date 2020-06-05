import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SocketService} from '../../../../services/socket.service';
import {DataStoreService} from '../../../../../../core/services/data-store.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ITee} from '../../../../interfaces/itee';
import {Stages} from '../../../../constants/stages.enum';

@Component({
  selector: 'app-tee-result-view',
  templateUrl: './tee-result-view.component.html',
  styleUrls: ['./tee-result-view.component.scss']
})
export class TeeResultViewComponent implements OnInit, OnDestroy {
  private notifier = new Subject();
  public tee: ITee;


  constructor(private router: Router,
              private socketService: SocketService,
              private dataStore: DataStoreService,
  ) {
  }

  ngOnInit(): void {
    this.dataStore.setGameStage(Stages.finish);
    this.listenTeeWinner();
    this.socketService.emit('request-winner-tee', {room: this.dataStore.getRoomCode()});
  }

  private listenTeeWinner(): void {
    this.socketService.listen('send-winner-tee')
      .pipe(takeUntil(this.notifier))
      .subscribe(({payload}) => {
        this.tee = payload;
      });
  }

  public leaveGame() {
    this.router.navigate(['/main/welcome']);
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
