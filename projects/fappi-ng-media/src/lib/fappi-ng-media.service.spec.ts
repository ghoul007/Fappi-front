import {TestBed} from '@angular/core/testing';

import {FappiNgMediaService} from './fappi-ng-media.service';

describe('FappiNgMediaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FappiNgMediaService = TestBed.get(FappiNgMediaService);
    expect(service).toBeTruthy();
  });
});
