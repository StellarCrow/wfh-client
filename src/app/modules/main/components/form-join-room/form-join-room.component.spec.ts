import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { FormJoinRoomComponent } from './form-join-room.component';

describe('FormJoinRoomComponent', () => {
  let component: FormJoinRoomComponent;
  let fixture: ComponentFixture<FormJoinRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormJoinRoomComponent],
      imports: [RouterTestingModule],
      providers: [FormBuilder],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
