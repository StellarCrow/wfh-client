import {TestBed} from '@angular/core/testing';

import {HideContentService} from './hide-content.service';

describe('HideContentService', () => {
  let service: HideContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
