import { Injectable } from '@angular/core';
import { IAnswer } from '../../../model/quiz/answer';
import { round, shuffleArray } from '../../utilities';
import { ICountryData } from './entities';
import { IQuestion, Question } from '../../../model/quiz/question';
import { QuizConfiguration } from '../../../model/quiz/quiz-configuration';
import { Quiz } from '../../../model/quiz/quiz';
import { CountryDataProviderService } from './country-data-provider.service';
import { BaseQuestionGeneratorService } from '../base-question-generator.service';
import { BaseQuestionGenerator, NumericQuestionGenerator } from '../base-generators';
import { ISpellEnrichmentService, SpellEnrichmentService } from '../../spell-enrichment.service';

@Injectable({
  providedIn: 'root'
})
export class CountryDataQuestionGeneratorService extends BaseQuestionGeneratorService<ICountryData> {

  private _countryWineAreaQuestionGenerator:CountryWineAreaQuestionGenerator; 
  private _countryProductionAmountQuestionGenerator:CountryProductionAmountQuestionGenerator;
  private _generators: BaseQuestionGenerator<ICountryData>[];

  constructor(private dataProvider: CountryDataProviderService,
    private spellEnricherService: SpellEnrichmentService
   ) { 
    super();
    this._countryWineAreaQuestionGenerator= new CountryWineAreaQuestionGenerator(4, 100, this.spellEnricherService);
    this._countryProductionAmountQuestionGenerator = new CountryProductionAmountQuestionGenerator(4, 0.1, this.spellEnricherService);
    this._generators = [];
    this._generators.push(this._countryWineAreaQuestionGenerator);
    this._generators.push(this._countryProductionAmountQuestionGenerator);
  }

  public override supports(quizConfiguration: QuizConfiguration): boolean {
    return quizConfiguration.includeQuestionsForCountryData;
  }

  public override get generators(): BaseQuestionGenerator<ICountryData>[] {
    return this._generators;
  }

  public override get data(): ICountryData[] {
    return this.dataProvider.data;
  }

  /*public countQuestions(quizConfiguration:QuizConfiguration): number {
    if (!quizConfiguration.includeQuestionsForCountryData)
      return 0;

    let questionCount:number = 0;
    let countryData = this.dataProvider.data;
    for (let country of countryData) {
      questionCount += this._countryWineAreaQuestionGenerator.countQuestion(country);
      questionCount += this._countryProductionAmountQuestionGenerator.countQuestion(country);
    }
    return questionCount;
  }*/

  /*public addQuestions(quiz:Quiz, quizConfiguration:QuizConfiguration) {
    if (!quizConfiguration.includeQuestionsForCountryData)
      return quiz;

    let nextQuestionIndex:number = quiz.numberOfQuestions + 1;
    let countryData = this.dataProvider.data;
    for (let country of countryData) {
      nextQuestionIndex += this.add(quiz, this._countryWineAreaQuestionGenerator.makeQuestion(nextQuestionIndex, country));
      nextQuestionIndex += this.add(quiz, this._countryProductionAmountQuestionGenerator.makeQuestion(nextQuestionIndex, country));
    }
    return quiz;
  }*/
}

class CountryWineAreaQuestionGenerator extends NumericQuestionGenerator<ICountryData> {
  
  constructor(count: number, precision:number, spellenrichmentService: ISpellEnrichmentService) {
    super(count, precision, spellenrichmentService);
  }

  protected override checkQuestionsPossible(country: ICountryData): boolean {
    return country.wineArea != undefined;
  }

  protected override makeQuestionText(relativeIndex: number, country: ICountryData): string {
    let countryName = this.spellenrichmentService.enrichCountryName(country.name);
    return `Wie groß ist die Rebfläche von ${countryName}? `;
  }
  
  protected override makeCorrectAnswers(relativeIndex: number, country: ICountryData): IAnswer[] {
    return [{ name: country.wineArea.toString()+' ha', isCorrect: true }];
  }

  protected override makeFictiveAnswerText(country: ICountryData, multiplicationFactor: number): string {
    let fictiveAmount: number = country.wineArea! * multiplicationFactor;
    let roundedValue = round(fictiveAmount, this.precision);
    return `${roundedValue} ha`;
  }
}

class CountryProductionAmountQuestionGenerator extends NumericQuestionGenerator<ICountryData> {

  constructor(count: number, roundingSize:number, spellenrichmentService: ISpellEnrichmentService) {
    super(count, roundingSize, spellenrichmentService);
  }

  protected override checkQuestionsPossible(country: ICountryData): boolean {
    return country.productionAmount != null;
  }

  protected override makeQuestionText(relativeIndex: number,country: ICountryData): string {
    let countryName = this.spellenrichmentService.enrichCountryName(country.name);
    return `Wieviel Wein wird in ${countryName} im Jahr produziert?`;
  }

  protected override makeCorrectAnswers(relativeIndex: number,country: ICountryData): IAnswer[] {
    return [{ name: country.productionAmount!.toString()+' Mio hl', isCorrect: true }];
  }

  protected override makeFictiveAnswerText(country: ICountryData, multiplicationFactor: number): string {
    let fictiveAmount: number = country.productionAmount! * multiplicationFactor;
    let roundedValue = round(fictiveAmount, this.precision);
    return `${roundedValue} Mio hl`;
  }
}

