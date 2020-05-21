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
    this.createForm();
  }

  public createForm(): void {
    this.formJoinRoom = this.formBuilder.group({
      room: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      nickname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]]
    });
  }

  public isFieldValid(field: string): boolean {
    return !this.formJoinRoom.get(field).valid && this.formJoinRoom.get(field).touched;
  }

  public isAllFieldsValid(): boolean {
    const formValues = this.formJoinRoom.value;
    for (const field in formValues) {
      if (this.formJoinRoom.hasOwnProperty(field)) {
        const valid = this.isFieldValid(field);
        if (!valid) {
          return false;
        }
      }
    }
    return true;
  }

  public onSubmit(): void {
    if (!this.isAllFieldsValid()) {
      return;
    }
    const room = this.formJoinRoom.value.room;
    const nickname = this.formJoinRoom.value.nickname;
    console.log('In submit');

    //Joining a room
  }

}
