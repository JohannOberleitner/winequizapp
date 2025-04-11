import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz/quiz';
import { IQuestion, Question } from '../model/quiz/question';
import { IAnswer } from '../model/quiz/answer';
import { producerAccessed } from '@angular/core/primitives/signals';
import { QuizConfiguration } from '../model/quiz/quiz-configuration';
import { CountryDataQuestionGeneratorService } from './generators/countryData/country-data-question-generator.service';
import { WinegrapeQuestionGeneratorService } from './generators/grapevarieties/winegrape-question-generator.service';
import { WineRegionQuestionGeneratorService } from './generators/wine-regions/wine-region-question-generator.service';
import { IBaseQuestionGeneratorService } from './generators/base-question-generator.service';

@Injectable({
  providedIn: 'root'
})
export class QuizGeneratorService {

  generators: IBaseQuestionGeneratorService[];

  constructor(private countryDataQuestionGeneratorService: CountryDataQuestionGeneratorService,
    private grapeVarietyQuestionGeneratorService: WinegrapeQuestionGeneratorService,
    private wineRegionQuestionGeneratorService: WineRegionQuestionGeneratorService)
  { 
    this.generators = [];
    this.generators.push(this.countryDataQuestionGeneratorService);
    this.generators.push(this.grapeVarietyQuestionGeneratorService);
    this.generators.push(this.wineRegionQuestionGeneratorService);
  }

  public createQuiz(quizConfiguration:QuizConfiguration): Quiz {
    let quiz = new Quiz();
    this.generators.forEach(
      gen => gen.addQuestions(quiz, quizConfiguration)
    );
    /*this.countryDataQuestionGeneratorService.addQuestions(quiz, quizConfiguration);
    this.grapeVarietyQuestionGeneratorService.addQuestions(quiz, quizConfiguration);
    this.wineRegionQuestionGeneratorService.addQuestions(quiz, quizConfiguration);*/

    /*let index=1;
    for (let country of this.countryData) {
      
      index += this.add(quiz, this._countryWineAreaQuestionGenerator.makeQuestion(index, country));
      index += this.add(quiz, this._countryProductionAmountQuestionGenerator.makeQuestion(index, country));
    }*/
    return quiz;
  }
  /*private add(quiz: Quiz, question: IQuestion | undefined): number {
    if (question != undefined) {
      quiz.add(new Question(question));
      return 1;
    }
    return 0;
  }*/

  public countQuestions(quizConfiguration: QuizConfiguration): number {
    let number = 0;
    this.generators.forEach(
      gen => number += gen.countQuestions(quizConfiguration)
    );
    return number;
  }
}


