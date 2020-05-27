import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PencilColorsComponent} from './pencil-colors.component';

describe('PencilColorsComponent', () => {
  let component: PencilColorsComponent;
  let fixture: ComponentFixture<PencilColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PencilColorsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PencilColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
