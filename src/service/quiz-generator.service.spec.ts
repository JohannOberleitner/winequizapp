import { TestBed } from '@angular/core/testing';

import { QuizGeneratorService } from './quiz-generator.service';

describe('QuizGeneratorService', () => {
  let service: QuizGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
