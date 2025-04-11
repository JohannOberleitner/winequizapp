import { Injectable } from '@angular/core';
import { WineRegionsDataProviderService } from './wine-regions-data-provider.service';
import { BaseQuestionGeneratorService } from '../base-question-generator.service';
import { QuizConfiguration } from '../../../model/quiz/quiz-configuration';
import { Quiz } from '../../../model/quiz/quiz';
import { BaseQuestionGenerator, NumericQuestionGenerator } from '../base-generators';
import { ISpecialQuestion, IWineRegionData } from './entities';
import { IAnswer } from '../../../model/quiz/answer';
import { round } from '../../utilities';
import { ISpellEnrichmentService, SpellEnrichmentService } from '../../spell-enrichment.service';

@Injectable({
  providedIn: 'root'
})
export class WineRegionQuestionGeneratorService extends BaseQuestionGeneratorService<IWineRegionData> {

  private _vineyardAreaQuestionGenerator: VineyardAreaQuestionGenerator; 
  private _specialQuestionGenerator: SpecialQuestionGenerator;
  private _generators: BaseQuestionGenerator<IWineRegionData>[];

  constructor(private dataProvider: WineRegionsDataProviderService,
    private spellEnricherService: SpellEnrichmentService
  ) { 
    super();
    this._vineyardAreaQuestionGenerator = new VineyardAreaQuestionGenerator(4, 1, this.spellEnricherService);
    this._specialQuestionGenerator = new SpecialQuestionGenerator(this.spellEnricherService);
    this._generators = [];
    this._generators.push(this._vineyardAreaQuestionGenerator);
    this._generators.push(this._specialQuestionGenerator)
  }

  public override supports(quizConfiguration: QuizConfiguration): boolean {
      return quizConfiguration.includeQuestionsForWineRegions;
  }
  
  public override get generators(): BaseQuestionGenerator<IWineRegionData>[] {
      return this._generators;
  }
  
  public override get data(): IWineRegionData[] {
      return this.dataProvider.data;
  }
}

class VineyardAreaQuestionGenerator extends NumericQuestionGenerator<IWineRegionData> {
  
  constructor(count: number, precision:number, spellenrichmentService: ISpellEnrichmentService) {
    super(count, precision, spellenrichmentService);
  }

  protected override checkQuestionsPossible(wineRegion: IWineRegionData): boolean {
    return wineRegion.area != undefined;
  }

  protected override makeQuestionText(relativeIndex: number, wineRegion: IWineRegionData): string {
    let enrichedWineRegionName = this.spellenrichmentService.enrichWineRegionName(wineRegion.name, 'wineRegion');
    return `Wie groß ist die Rebfläche von ${enrichedWineRegionName}? `;
  }
  
  protected override makeCorrectAnswers(relativeIndex: number, wineRegion: IWineRegionData): IAnswer[] {
    return [{ name: wineRegion.area!.toString()+' ha', isCorrect: true }];
  }

  protected override makeFictiveAnswerText(wineRegion: IWineRegionData, multiplicationFactor: number): string {
    let fictiveAmount: number = wineRegion.area! * multiplicationFactor;
    let roundedValue = round(fictiveAmount, this.precision);
    return `${roundedValue} ha`;
  }
}

class SpecialQuestionGenerator extends BaseQuestionGenerator<IWineRegionData> {
  constructor(spellenrichmentService: ISpellEnrichmentService) {
    super(0, spellenrichmentService);
  }

  public override countQuestion(data: IWineRegionData): number {
    if (this.checkQuestionsPossible(data))
      return data.specials!.length;

    return 0;
  }
  
  private getSpecialQuestionData(relativeIndex: number, data: IWineRegionData): ISpecialQuestion {
    return data.specials![relativeIndex];
  }

  protected override checkQuestionsPossible(data: IWineRegionData): boolean {
    return data.specials !== undefined;
  }
  protected override makeQuestionText(relativeIndex: number, data: IWineRegionData): string {
    return this.getSpecialQuestionData(relativeIndex,data).question;
  }

  private makeSpecialAnswers(answerTexts: string[], correct:boolean): IAnswer[] {
    let answers: IAnswer[] = [];
    answerTexts.forEach( 
      answer => answers.push({ name: answer , isCorrect:correct })
    )
    return answers;
  }

  protected override makeCorrectAnswers(relativeIndex: number, data: IWineRegionData): IAnswer[] {
    let correct_answers = 
      this.makeSpecialAnswers(this.getSpecialQuestionData(relativeIndex,data).correct_answers, true);
    return correct_answers;
  }
  protected override makeWrongAnswers(relativeIndex: number, data: IWineRegionData, count: number): IAnswer[] {
    let wrong_answers = 
      this.makeSpecialAnswers(this.getSpecialQuestionData(relativeIndex,data).wrong_answers, false);
    return wrong_answers;
  }

}