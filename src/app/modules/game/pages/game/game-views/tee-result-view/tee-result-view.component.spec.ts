import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeeResultViewComponent} from './tee-result-view.component';

describe('TeeResultViewComponent', () => {
  let component: TeeResultViewComponent;
  let fixture: ComponentFixture<TeeResultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeeResultViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
