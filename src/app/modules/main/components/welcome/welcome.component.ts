import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {IUser} from '../../../../shared/interfaces/user';
import {MatDialog} from '@angular/material/dialog';
import {ModalJoinRoomComponent} from '../modal-join-room/modal-join-room.component';

@Component({
  selector: 'app-home',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalJoinRoomComponent, {
      panelClass: 'custom-dialog',
      minWidth: '40%',
      position: { right: '10%' }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public createRoom(): void {
    this.router.navigate(['game/lobby']);
  }

}
