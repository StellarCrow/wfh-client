import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLeavePage } from './modal-leave-page';

describe('ModalGameStartedComponent', () => {
  let component: ModalLeavePage;
  let fixture: ComponentFixture<ModalLeavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLeavePage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
