import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../../game/services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalJoinRoomComponent} from '../modal-join-room/modal-join-room.component';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-form-join-room',
  templateUrl: './form-join-room.component.html',
  styleUrls: ['./form-join-room.component.scss']
})
export class FormJoinRoomComponent implements OnInit, OnDestroy {
  public formJoinRoom: FormGroup;
  public errorMessage: string;
  private notifier = new Subject();

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
    this.socketService.listen('error-event')
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.errorMessage = data.answer;
      });
    this.socketService.listen('room-available')
      .pipe(takeUntil(this.notifier))
      .subscribe(data => {
        this.dataStore.setRoomCode(data.payload);
        this.router.navigate(['game/lobby']);
        this.dialogRef.close();
      });
  }


  public onSubmit(): void {
    this.socketService.emit('check-room', this.formJoinRoom.get('room').value);
  }

  public ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
