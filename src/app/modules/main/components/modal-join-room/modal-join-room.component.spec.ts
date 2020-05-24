import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJoinRoomComponent } from './modal-join-room.component';

describe('ModalJoinRoomComponent', () => {
  let component: ModalJoinRoomComponent;
  let fixture: ComponentFixture<ModalJoinRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJoinRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
