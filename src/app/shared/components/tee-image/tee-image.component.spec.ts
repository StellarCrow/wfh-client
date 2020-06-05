import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeeImageComponent} from './tee-image.component';

describe('TeeImageComponent', () => {
  let component: TeeImageComponent;
  let fixture: ComponentFixture<TeeImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeeImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
