import { TestBed } from '@angular/core/testing';

import { WineRegionQuestionGeneratorService } from './wine-region-question-generator.service';

describe('WineRegionQuestionGeneratorService', () => {
  let service: WineRegionQuestionGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineRegionQuestionGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
