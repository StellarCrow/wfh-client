import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormJoinRoomComponent} from './form-join-room.component';

describe('FormJoinRoomComponent', () => {
  let component: FormJoinRoomComponent;
  let fixture: ComponentFixture<FormJoinRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormJoinRoomComponent]
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
