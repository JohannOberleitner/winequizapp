import { TestBed } from '@angular/core/testing';

import { WineRegionsDataProviderService } from './wine-regions-data-provider.service';

describe('WineRegionsDataProviderService', () => {
  let service: WineRegionsDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineRegionsDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
