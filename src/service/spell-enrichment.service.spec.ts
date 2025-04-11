import { TestBed } from '@angular/core/testing';

import { SpellEnrichmentService } from './spell-enrichment.service';

describe('SpellEnrichmentService', () => {
  let service: SpellEnrichmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellEnrichmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
