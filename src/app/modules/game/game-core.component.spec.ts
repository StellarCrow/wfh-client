import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameCoreComponent} from './game-core.component';

describe('GameCoreComponent', () => {
  let component: GameCoreComponent;
  let fixture: ComponentFixture<GameCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameCoreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
