import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../../game/services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ModalJoinRoomComponent} from '../modal-join-room/modal-join-room.component';

@Component({
  selector: 'app-form-join-room',
  templateUrl: './form-join-room.component.html',
  styleUrls: ['./form-join-room.component.scss']
})
export class FormJoinRoomComponent implements OnInit {
  public formJoinRoom: FormGroup;
  public errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private router: Router,
    private dialogRef: MatDialogRef<ModalJoinRoomComponent>) {
  }

  ngOnInit(): void {
    this.formJoinRoom = this.formBuilder.group({
      room: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    });
    this.socketService.listen('error-event').subscribe(data => {
      this.errorMessage = data.answer;
    });
    this.socketService.listen('room-available').subscribe(data => {
      this.dataStore.setRoomCode(data.payload);
      this.router.navigate(['game/lobby']);
      this.dialogRef.close();
    });
  }


  public onSubmit(): void {
    this.socketService.emit('check-room', this.formJoinRoom.get('room').value);
  }

}
