import { Injectable } from '@angular/core';
import { Quiz } from '../../../model/quiz/quiz';
import { IQuestion, Question } from '../../../model/quiz/question';
import { IAnswer } from '../../../model/quiz/answer';
import { shuffleArray } from '../../utilities';
import { GrapeVarietyDataProviderService } from './grape-variety-data-provider.service';
import { QuizConfiguration } from '../../../model/quiz/quiz-configuration';
import { BaseQuestionGeneratorService } from '../base-question-generator.service';
import { AcidLevel, IGrapeVarietyData } from './entities';
import { BaseQuestionGenerator } from '../base-generators';
import { SpellEnrichmentService } from '../../spell-enrichment.service';

@Injectable({
  providedIn: 'root'
})
export class WinegrapeQuestionGeneratorService extends BaseQuestionGeneratorService<IGrapeVarietyData>  {

  private _acidGenerator: AcidLevelQuestionGenerator;
  private _generators: BaseQuestionGenerator<IGrapeVarietyData>[];

  constructor(private dataProvider: GrapeVarietyDataProviderService,
    private spellEnricherService: SpellEnrichmentService
  )
  { 
    super();
    this._acidGenerator = new AcidLevelQuestionGenerator(this.spellEnricherService);
    this._generators = [];
    this._generators.push(this._acidGenerator);
  }

  public override supports(quizConfiguration: QuizConfiguration): boolean {
    return quizConfiguration.includeQuestionsForGrapeVarienties;
  }

  public override get generators(): BaseQuestionGenerator<IGrapeVarietyData>[] {
      return this._generators;
    }
  
    public override get data(): IGrapeVarietyData[] {
      return this.dataProvider.data;
    }

  /*public addQuestions(quiz:Quiz, quizConfiguration:QuizConfiguration) {
    if (!quizConfiguration.includeQuestionsForGrapeVarienties)
      return quiz;

    let nextQuestionIndex:number = quiz.numberOfQuestions + 1;
    let grapeVarietiesData = this.dataProvider.data;
    for (let grapeVariety of grapeVarietiesData) {
      nextQuestionIndex += this.add(quiz, this._acidGenerator.makeQuestion(nextQuestionIndex, grapeVariety));
    }
    return quiz;
  }*/
}




/*abstract class BaseQuestionGenerator {

  constructor(protected count: number) {
  }

  protected resort(answers: IAnswer[]): IAnswer[] {
    return shuffleArray<IAnswer>(answers);
  }
  public makeQuestion(index: number, grape: IGrapeVarietyData): IQuestion | undefined {
    if (! this.checkQuestionPossible(grape))
      return undefined;

    let answers: IAnswer[] = this.makeAnswers(grape);
    let text = this.makeQuestionText(grape);
    return { index: index, text: text, answers: this.resort(answers) };;
  }
  protected makeAnswers(grape: IGrapeVarietyData): IAnswer[] {
    let answers: IAnswer[] = [];
    answers.push(this.makeCorrectAnswer(grape));
    let wrongAnswers = this.makeWrongAnswers(grape, this.count);
    answers = answers.concat(wrongAnswers);
    for(let i of answers) {
      console.log('Answr:'+i.name+','+i.isCorrect);
    }
    

    return answers;
  }

  protected abstract checkQuestionPossible(grape: IGrapeVarietyData): boolean;
  protected abstract makeQuestionText(grape: IGrapeVarietyData): string;

  protected abstract makeCorrectAnswer(grape: IGrapeVarietyData): IAnswer;
  protected abstract makeWrongAnswers(grape: IGrapeVarietyData, count: number): IAnswer[];
}*/

abstract class EnumQuestionGenerator<T> extends BaseQuestionGenerator<IGrapeVarietyData> {
  constructor(count: number, private fieldName: string, spellEnricherService: SpellEnrichmentService) {
    super(count, spellEnricherService);
  }

  protected override checkQuestionsPossible(grape: IGrapeVarietyData): boolean {
    // can only access this on an any object
    let grapeObject: any = grape;
    return grapeObject[this.fieldName];
  }
  
  protected abstract getAllItems(): (string|T)[];
  protected abstract convert<T>(t: T): string|undefined;

  protected override makeCorrectAnswers(relativeIndex: number, grape: IGrapeVarietyData): IAnswer[] {
    let grapeObject: any = grape;
    let correct = grapeObject[this.fieldName];
    return [{ name: this.convert(correct)!, isCorrect: true }];
  }

  protected override makeWrongAnswers(relativeIndex: number, grape: IGrapeVarietyData, count: number): IAnswer[] {
    let answers: IAnswer[] = [];
    let grapeObject: any = grape;
    let correct = grapeObject[this.fieldName];
    let items = this.getAllItems();
    for (let item in items) {
            
      if (item == correct) continue;

      let enumElementName = this.convert(item);
      if (enumElementName === undefined)
        continue;

      let wrongAnswer = { name: enumElementName, isCorrect: false };
      answers.push(wrongAnswer);
    }
    return answers;
  }
} 

class AcidLevelQuestionGenerator extends EnumQuestionGenerator<AcidLevel> {
  constructor(spellEnricherService: SpellEnrichmentService) {
    super(3, 'acid', spellEnricherService);
  }

  protected override makeQuestionText(relativeIndex: number, grape: IGrapeVarietyData): string {
    return `Wie groß ist die Säure von ${grape.name}?`;
  }

  protected override convert<AcidLevel>(t: AcidLevel): string|undefined {
    switch(t) {
      case AcidLevel.Low: case 0: case '0': return "niedrig";
      case AcidLevel.Medium: case 1: case '1': return "mittel";
      case AcidLevel.High: case 2: case '2': return "hoch";
      default: return undefined;
    }
  }

  protected override getAllItems(): (string|AcidLevel)[] {
    return Object.values(AcidLevel);
  }
}
