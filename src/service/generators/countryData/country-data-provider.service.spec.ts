import { TestBed } from '@angular/core/testing';

import { CountryDataProviderService } from './country-data-provider.service';

describe('CountryDataProviderService', () => {
  let service: CountryDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
