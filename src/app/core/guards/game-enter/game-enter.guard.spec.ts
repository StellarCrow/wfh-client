import { TestBed } from '@angular/core/testing';

import { GameEnterGuard } from './game-enter.guard';

describe('GameEnterGuard', () => {
  let guard: GameEnterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameEnterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
