import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizGeneratorService {

  constructor() { }

  public createCountryQuiz() {
    return new Quiz();
  }

  public createGrapeVarietyQuiz() {
    return new Quiz();
  }

  public createWineRegionQuiz() {
    return new Quiz();
  }

  // range: N vs ALL
  // filter: country[], grape[], ...
  // countryQuestionGenerator
}
