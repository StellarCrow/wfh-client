import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ModalLeavePage} from '../../../shared/components/modal-leave-page/modal-leave-page';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SocketService} from '../../../modules/game/services/socket.service';
import {DataStoreService} from '../../services/data-store.service';
import {ModalRoomDeletedComponent} from '../../../shared/components/modal-room-deleted/modal-room-deleted.component';

@Injectable({
  providedIn: 'root'
})
export class GameLeaveGuard implements CanDeactivate<Observable<any>> {

  constructor(private dialog: MatDialog,
              private socketService: SocketService,
              private dataStore: DataStoreService,
              private router: Router) {
  }

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot) {
    const isRoomDeleted = this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.roomDeleted;
    if (isRoomDeleted) {
      this.dialog.open(ModalRoomDeletedComponent, { panelClass: 'custom-dialog', maxWidth: '40%' });
      return true;
    }

    const dialogRef = this.dialog.open(ModalLeavePage, { panelClass: 'custom-dialog', maxWidth: '40%' });
    return dialogRef.afterClosed().pipe(
      tap((answer) => {
        if (answer) {
          this.socketService.emit('leave-room', { room: this.dataStore.roomCode, username: this.dataStore.getUserName() });
        }
      })
    );
  }

}
