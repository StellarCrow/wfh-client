import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-join-room',
  templateUrl: './form-join-room.component.html',
  styleUrls: ['./form-join-room.component.scss']
})
export class FormJoinRoomComponent implements OnInit {

  public formJoinRoom: FormGroup;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formJoinRoom = this.formBuilder.group({
      room: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
    });
  }

  public isFieldValid(field: string): boolean {
    return !this.formJoinRoom.get(field).valid && this.formJoinRoom.get(field).touched;
  }

  public onSubmit(): void {

    const room = this.formJoinRoom.value.room;
    console.log('In submit');

    //Joining a room
  }

}
