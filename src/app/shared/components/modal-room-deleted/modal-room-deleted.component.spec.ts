import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoomDeletedComponent } from './modal-room-deleted.component';

describe('ModalRoomDeletedComponent', () => {
  let component: ModalRoomDeletedComponent;
  let fixture: ComponentFixture<ModalRoomDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRoomDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRoomDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
