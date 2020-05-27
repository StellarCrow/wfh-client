import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseViewComponent } from './phrase-view.component';

describe('PhraseViewComponent', () => {
  let component: PhraseViewComponent;
  let fixture: ComponentFixture<PhraseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhraseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
