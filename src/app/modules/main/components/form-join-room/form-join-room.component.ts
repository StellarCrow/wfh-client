import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../../../game/services/socket.service';
import {DataStoreService} from '../../../../core/services/data-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form-join-room',
  templateUrl: './form-join-room.component.html',
  styleUrls: ['./form-join-room.component.scss']
})
export class FormJoinRoomComponent implements OnInit {

  public formJoinRoom: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private socketService: SocketService,
    private dataStore: DataStoreService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formJoinRoom = this.formBuilder.group({
      room: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    });
  }

  public isFieldValid(field: string): boolean {
    return !this.formJoinRoom.get(field).valid && this.formJoinRoom.get(field).touched;
  }

  public joinRoom(): void {
    const room = this.formJoinRoom.value.room;
    this.dataStore.setRoomCode(room);
    this.socketService.emit('new-user', {username: this.dataStore.getUserName(), room});
    this.router.navigate(['game/lobby']);
  }

}
