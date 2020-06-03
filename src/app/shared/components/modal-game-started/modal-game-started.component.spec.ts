import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGameStartedComponent } from './modal-game-started.component';

describe('ModalGameStartedComponent', () => {
  let component: ModalGameStartedComponent;
  let fixture: ComponentFixture<ModalGameStartedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGameStartedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGameStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
