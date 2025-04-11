import { TestBed } from '@angular/core/testing';

import { WinegrapeQuestionGeneratorService } from './winegrape-question-generator.service';
import { QuizConfiguration } from '../../../model/quiz/quiz-configuration';
import { Quiz } from '../../../model/quiz/quiz';

describe('WinegrapeGeneratorService', () => {
  let service: WinegrapeQuestionGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinegrapeQuestionGeneratorService);
  });

  it('check acid level question generation', () => {
    let quiz = new Quiz();
    let quizConfiguration = new QuizConfiguration();
    service.addQuestions(quiz, quizConfiguration);

    expect(quiz.numberOfQuestions).toBe(1);
    let question = quiz._questions[0];
    expect(question.text).toBe('Wie groß ist die Säure von Assyrtiko?');
    let answers = question.answers;
    expect(answers.length).toBe(3);

    let correctAnswer = answers.filter(answer => answer.isCorrect);
    expect(correctAnswer[0].name).toBe('hoch');

    let wrongAnswers = answers
      .filter(answer => !answer.isCorrect)
      .sort((a1, a2) => a1.name.localeCompare(a2.name) );

    expect(wrongAnswers.length).toBe(2);
    expect(wrongAnswers[0].name).toBe('mittel');
    expect(wrongAnswers[1].name).toBe('niedrig');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
