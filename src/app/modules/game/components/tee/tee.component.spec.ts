import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeeComponent } from './tee.component';

describe('TeeComponent', () => {
  let component: TeeComponent;
  let fixture: ComponentFixture<TeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
