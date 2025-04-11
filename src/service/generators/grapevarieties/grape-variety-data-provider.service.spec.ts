import { TestBed } from '@angular/core/testing';

import { GrapeVarietyDataProviderService } from './grape-variety-data-provider.service';

describe('GrapeVarietyDataProviderService', () => {
  let service: GrapeVarietyDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrapeVarietyDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
