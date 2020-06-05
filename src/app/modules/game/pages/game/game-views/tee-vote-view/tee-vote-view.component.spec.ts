import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeeVoteViewComponent} from './tee-vote-view.component';

describe('TeeVoteViewComponent', () => {
  let component: TeeVoteViewComponent;
  let fixture: ComponentFixture<TeeVoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeeVoteViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeeVoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
