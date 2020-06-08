import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterUnderlinkComponent } from './router-underlink.component';

describe('RouterUnderlinkComponent', () => {
  let component: RouterUnderlinkComponent;
  let fixture: ComponentFixture<RouterUnderlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterUnderlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterUnderlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
