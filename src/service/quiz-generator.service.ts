import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz/quiz';
import { IQuestion, Question } from '../model/quiz/question';
import { IAnswer } from '../model/quiz/answer';
import { producerAccessed } from '@angular/core/primitives/signals';

@Injectable({
  providedIn: 'root'
})
export class QuizGeneratorService {

  private _countryWineAreaQuestionGenerator:CountryWineAreaQuestionGenerator 
  = new CountryWineAreaQuestionGenerator(4, 100);
  private _countryProductionAmountQuestionGenerator:CountryProductionAmountQuestionGenerator 
  = new CountryProductionAmountQuestionGenerator(4, 0.1);

  constructor() { }

  public createCountryQuiz(): Quiz {
    let quiz = new Quiz();
    let index=1;
    for (let country of this.countryData) {
      
      index += this.add(quiz, this._countryWineAreaQuestionGenerator.makeQuestion(index, country));
      index += this.add(quiz, this._countryProductionAmountQuestionGenerator.makeQuestion(index, country));
    }
    return quiz;
  }
  private add(quiz: Quiz, question: IQuestion | undefined): number {
    if (question != undefined) {
      quiz.add(new Question(question));
      return 1;
    }
    return 0;
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

  countryData: ICountryData[] = [
    {
      name: 'Frankreich', wineArea: 790000, proCapitaConsumption: 42,
      productionAmount: 44
    },
    {
      name: 'Deutschland', wineArea: 103000, proCapitaConsumption: 20,
      productionAmount: 9.0,
      grapeColorDistriubtion: { white: 64, red: 36 }
    },
    {
      name: 'Schweiz', article: 'der ', wineArea: 14800, proCapitaConsumption: 33,
      productionAmount: 1.1,
      grapeColorDistriubtion: { white: 48, red: 52 }
    },
    {
      name: 'Österreich', wineArea: 45000, proCapitaConsumption: 27,
      grapeColorDistriubtion: { white: 70, red: 3 }
    },
    {
      name: 'Ungarn', wineArea: 68000,proCapitaConsumption: 28,
      productionAmount: 2.5,
      grapeColorDistriubtion: { white: 72, red: 2, rose: 8 }
    },
    {
      name: 'Bulgarien', wineArea: 68000, 
      productionAmount: 1.3,
      grapeColorDistriubtion: { red: 67, white: 33 }
    },
    { name:'Rumänien', wineArea: 98000, proCapitaConsumption: 24,
      productionRange: { lowest: 3.5, largest: 5.5 },
      grapeColorDistriubtion: { white: 60, red: 40 },
      exportAndCnsumption: { consumer: 90 }
    },
    { name:'Kroatien', wineArea: 21000, productionAmount: 1
    },
    {
      name:'Slowenien', wineArea: 21200, productionAmount: 0.8,
      proCapitaConsumption: 40,
      grapeColorDistriubtion: { white: 70, red: 30 } 
    }
  ];
}

export interface IExportAndConsumption {
  export?: number,
  consumer?: number
}

export interface IProductionWineDistribution {
  white: number,
  red: number,
  rose?: number,
  sparkling?: number
} 

export interface NumberRange {
  lowest: number;
  largest: number;
}

export interface ICountryData {
  name: string,
  article?: string,
  wineArea: number,
  proCapitaConsumption?: number,
  productionAmount?: number,
  productionRange?: NumberRange,
  grapeColorDistriubtion?: IProductionWineDistribution,
  exportAndCnsumption?: IExportAndConsumption
}

export function shuffleArray<T>(array: T[]): T[] {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

abstract class BaseQuestionGenerator {

  constructor(protected count: number, protected roundingSize:number) {
  }

  protected resort(answers: IAnswer[]): IAnswer[] {
    return shuffleArray<IAnswer>(answers);
  }
  public makeQuestion(index: number, country: ICountryData): IQuestion | undefined {
    if (! this.checkQuestionPossible(country))
      return undefined;

    let answers: IAnswer[] = this.makeAnswers(country);
    let article = country.article ? country.article : '';
    let text = this.makeQuestionText(country); // `Wie groß ist die Rebfläche von ${article}${country.name}? `;
    return { index: index, text: text, answers: this.resort(answers) };;
  }
  protected makeAnswers(country: ICountryData): IAnswer[] {
    let answers: IAnswer[] = [];
    answers.push(this.makeCorrectAnswer(country));
    let wrongAnswers = this.makeWrongAnswers(country, this.count);
    answers = answers.concat(wrongAnswers);

    return answers;
  }

  protected abstract checkQuestionPossible(country: ICountryData): boolean;
  protected abstract makeQuestionText(country: ICountryData): string;

  protected abstract makeCorrectAnswer(country: ICountryData): IAnswer;
  protected abstract makeWrongAnswers(country: ICountryData, count: number): IAnswer[];
}

abstract class NumericQuestionGenerator extends BaseQuestionGenerator {
  constructor(count: number, roundingSize:number) {
    super(count, roundingSize);
  }

  protected override makeWrongAnswers(country: ICountryData, count: number): IAnswer[] {

    let multiplicationFactors: number[] = [ 0.25, 0.3, 0.5, 1.5, 2.0, 3.0, 4.0 ];
    let answers: IAnswer[] = [];
    let usedMultiplicationFactorIndex: number[] = [];
    while(answers.length < count) {
      let index = Math.floor(Math.random() * multiplicationFactors.length);
      if (usedMultiplicationFactorIndex.indexOf(index) != -1)
        continue;
      usedMultiplicationFactorIndex.push(index);

      let answerText = this.makeFictiveAnswerText(country, multiplicationFactors[index]);
      console.log(answerText);
      let answer = { name: answerText, isCorrect: false };
      answers.push(answer);
    }
    return answers;
  }

  protected abstract makeFictiveAnswerText(country: ICountryData, multiplicationFactor: number): string;
} 

class CountryWineAreaQuestionGenerator extends BaseQuestionGenerator {

  constructor(count: number, roundingSize:number) {
    super(count, roundingSize);
  }

  protected override checkQuestionPossible(country: ICountryData): boolean {
    return country.wineArea != undefined;
  }

  protected override makeQuestionText(country: ICountryData): string {
    let article = country.article ? country.article : '';
    return `Wie groß ist die Rebfläche von ${article}${country.name}? `;
  }
  
/*  protected override makeAnswers(country: ICountryData): IAnswer[] {
    let answers: IAnswer[] = [];
    answers.push(this.makeCorrectAnswer(country));
    let wrongAnswers = this.makeWrongAnswers(country, this.count);
    answers = answers.concat(wrongAnswers);

    //alert(wrongAnswers.length + ' ' + answers.length);
    return answers;
  }*/

  protected override makeCorrectAnswer(country: ICountryData): IAnswer {
    return { name: country.wineArea.toString()+' ha', isCorrect: true };
  }
  
  protected override makeWrongAnswers(country: ICountryData, count: number): IAnswer[] {

    let multiplicationFactors: number[] = [ 0.25, 0.3, 0.5, 1.5, 2.0, 3.0, 4.0 ];
    let answers: IAnswer[] = [];
    let usedMultiplicationFactorIndex: number[] = [];
    while(answers.length < count) {
      let index = Math.floor(Math.random() * multiplicationFactors.length);
      if (usedMultiplicationFactorIndex.indexOf(index) != -1)
        continue;
      usedMultiplicationFactorIndex.push(index);

      let roundedFictiveWineArea = this.makeFictiveWinArea(country, multiplicationFactors[index]);
      let answer = { name: roundedFictiveWineArea.toString()+' ha', isCorrect: false };
      answers.push(answer);
    }
    return answers;
  }
  private makeFictiveWinArea(country: ICountryData, multiplicationFactor: number): number {
    let fictiveWineArea: number = country.wineArea * multiplicationFactor;
    return Math.round(fictiveWineArea / this.roundingSize)*this.roundingSize;
  }

  /*
  makeProducitonAmountQuestion(country: ICountryData): IQuestion {
    
    let answers: IAnswer[] = this.makeAnswers(country);
    let article = country.article ? country.article : '';
    let text = `Wie hoch die durchschnittliche jährliche Proudction von ${article}${country.name}? `;
    return { text: text, answers: this.resort(answers) };;

  }
    */
}

class CountryProductionAmountQuestionGenerator extends NumericQuestionGenerator {

  constructor(count: number, roundingSize:number) {
    super(count, roundingSize);
  }

  protected override makeQuestionText(country: ICountryData): string {
    let article = country.article ? country.article : '';
    return `Wieviel Wein wird in ${article}${country.name} im Jahr produziert?`;
  }

  protected override checkQuestionPossible(country: ICountryData): boolean {
    return country.productionAmount != null;
  }

  protected override makeCorrectAnswer(country: ICountryData): IAnswer {
    return { name: country.productionAmount!.toString()+' Mio hl', isCorrect: true };
  }

  protected override makeFictiveAnswerText(country: ICountryData, multiplicationFactor: number): string {
    let fictiveAmount: number = country.productionAmount! * multiplicationFactor;
    let roundedValue = 0.0;
    if (this.roundingSize < 1.0 ) {
      let roundingSizeInverted = Math.round(1/this.roundingSize);
      roundedValue =  Math.round(fictiveAmount * roundingSizeInverted)/  roundingSizeInverted;
    } else {
      roundedValue =  Math.round(fictiveAmount / this.roundingSize)*  this.roundingSize;
    }

    //console.log('fictive: '+roundedValue +' '+ fictiveAmount+' '+country.productionAmount! + ' ' + country.name);

    return `${roundedValue} Mio hl`;
  }

  
}
