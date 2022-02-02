import { TestBed } from '@angular/core/testing';

import { NgFhirjsService } from './ng-fhirjs.service';

describe('NgFhirjsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgFhirjsService = TestBed.get(NgFhirjsService);
    expect(service).toBeTruthy();
  });
});
