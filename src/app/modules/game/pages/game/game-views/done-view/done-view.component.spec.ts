import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoneViewComponent} from './done-view.component';

describe('DoneViewComponent', () => {
  let component: DoneViewComponent;
  let fixture: ComponentFixture<DoneViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoneViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
