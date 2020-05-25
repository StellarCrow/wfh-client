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

  public onSubmit(): void {
    this.dataStore.setRoomCode(this.formJoinRoom.value.room);
    this.router.navigate(['game/lobby']);
  }

}
