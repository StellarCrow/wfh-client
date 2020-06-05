import {TestBed} from '@angular/core/testing';

import {GameLeaveGuard} from './game-leave.guard';

describe('GameLeaveGuard', () => {
  let guard: GameLeaveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GameLeaveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
