import { TestBed } from '@angular/core/testing';

import { CountryDataQuestionGeneratorService } from './country-data-question-generator.service';

describe('CountryDataQuestionGeneratorService', () => {
  let service: CountryDataQuestionGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDataQuestionGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
