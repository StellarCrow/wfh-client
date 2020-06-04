import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ModalLeavePage} from '../../../shared/components/modal-leave-page/modal-leave-page';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SocketService} from '../../../modules/game/services/socket.service';
import {DataStoreService} from '../../services/data-store.service';

@Injectable({
  providedIn: 'root'
})
export class GameLeaveGuard implements CanDeactivate<Observable<any>> {

  constructor(private dialog: MatDialog, private socketService: SocketService, private dataStore: DataStoreService) {
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {
    const dialogRef = this.dialog.open(ModalLeavePage, { panelClass: 'custom-dialog', maxWidth: '40%' });
    return dialogRef.afterClosed().pipe(
      tap((answer) => {
        if (answer) {
          this.socketService.emit('leave-room', { room: this.dataStore.roomCode, username: this.dataStore.getUserName(), });
        }
        console.log('close dialog');
      })
    );
  }

}
