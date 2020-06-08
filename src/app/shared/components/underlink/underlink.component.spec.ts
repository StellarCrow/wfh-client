import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlinkComponent } from './underlink.component';

describe('UnderlinkComponent', () => {
  let component: UnderlinkComponent;
  let fixture: ComponentFixture<UnderlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
