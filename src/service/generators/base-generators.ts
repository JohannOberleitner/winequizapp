import { IAnswer } from "../../model/quiz/answer";
import { IQuestion } from "../../model/quiz/question";
import { ISpellEnrichmentService } from "../spell-enrichment.service";
import { shuffleArray } from "../utilities";


export abstract class AbstractBaseQuestionGenerator<T> {

  protected resort(answers: IAnswer[]): IAnswer[] {
    return shuffleArray<IAnswer>(answers);
  }

  protected abstract checkQuestionsPossible(data: T): boolean;
  public abstract countQuestion(data: T): number;
  public abstract makeQuestion(startIndex: number, data: T): IQuestion[] | undefined;
}

export abstract class BaseQuestionGenerator<T> extends AbstractBaseQuestionGenerator<T> {

  constructor(protected count: number, protected spellenrichmentService: ISpellEnrichmentService) {
    super();
  }

  
  public override countQuestion(data: T): number {
    if (! this.checkQuestionsPossible(data))
      return 0;
    return 1;
  }

  public override makeQuestion(startIndex: number, data: T): IQuestion[] | undefined {
    if (! this.checkQuestionsPossible(data))
      return undefined;

    let count = this.countQuestion(data);
    let questions:IQuestion[] = [];
    for(let i=0; i<count; ++i) {
      let answers: IAnswer[] = this.makeAnswers(i, data);
      // TODO: let article = country.article ? country.article : '';
      let text = this.makeQuestionText(i, data); // `Wie groß ist die Rebfläche von ${article}${country.name}? `;
      questions.push({ index: i+startIndex, text: text, answers: this.resort(answers) });
    }
    return questions;
  }
  protected makeAnswers(relativeIndex: number, data: T): IAnswer[] {
    let answers: IAnswer[] = [];
    let correctAnswers = this.makeCorrectAnswers(relativeIndex, data);
    answers = answers.concat(correctAnswers);
    let wrongAnswers = this.makeWrongAnswers(relativeIndex, data, this.count);
    answers = answers.concat(wrongAnswers);

    return answers;
  }

  protected abstract makeQuestionText(relativeIndex: number, data: T): string;

  protected abstract makeCorrectAnswers(relativeIndex: number, data: T): IAnswer[];
  protected abstract makeWrongAnswers(relativeIndex: number, data: T, count: number): IAnswer[];
}

export abstract class NumericQuestionGenerator<T> extends BaseQuestionGenerator<T> {
  constructor(count: number, protected precision:number, spellenrichmentService: ISpellEnrichmentService) {
    super(count, spellenrichmentService);
  }

  protected override makeWrongAnswers(relativeIndex: number,data: T, count: number): IAnswer[] {

    let multiplicationFactors: number[] = [ 0.25, 0.3, 0.5, 1.5, 2.0, 3.0, 4.0 ];
    let answers: IAnswer[] = [];
    let usedMultiplicationFactorIndex: number[] = [];
    while(answers.length < count) {
      let index = Math.floor(Math.random() * multiplicationFactors.length);
      if (usedMultiplicationFactorIndex.indexOf(index) != -1)
        continue;
      usedMultiplicationFactorIndex.push(index);

      let answerText = this.makeFictiveAnswerText(data, multiplicationFactors[index]);
      console.log(answerText);
      let answer = { name: answerText, isCorrect: false };
      answers.push(answer);
    }
    return answers;
  }

  protected abstract makeFictiveAnswerText(data: T, multiplicationFactor: number): string;

  
} 
