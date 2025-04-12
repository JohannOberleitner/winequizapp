import { Injectable } from '@angular/core';
import { WineRegionsDataProviderService } from './wine-regions-data-provider.service';
import { BaseQuestionGeneratorService } from '../base-question-generator.service';
import { QuizConfiguration } from '../../../model/quiz/quiz-configuration';
import { Quiz } from '../../../model/quiz/quiz';
import { AbstractBaseQuestionGenerator, BaseQuestionGenerator, NumericQuestionGenerator } from '../base-generators';
import { IAppellationData, ISpecialQuestion, IWineRegionData, WineColor } from './entities';
import { IAnswer } from '../../../model/quiz/answer';
import { round } from '../../utilities';
import { ISpellEnrichmentService, SpellEnrichmentService } from '../../spell-enrichment.service';
import { IQuestion } from '../../../model/quiz/question';

@Injectable({
  providedIn: 'root'
})
export class WineRegionQuestionGeneratorService extends BaseQuestionGeneratorService<IWineRegionData> {

  private _vineyardAreaQuestionGenerator: VineyardAreaQuestionGenerator; 
  private _appellationQuestionGenerator: AppellationQuestionGenerator; 
  private _specialQuestionGenerator: SpecialQuestionGenerator;
  private _generators: AbstractBaseQuestionGenerator<IWineRegionData>[];

  constructor(private dataProvider: WineRegionsDataProviderService,
    private spellEnricherService: SpellEnrichmentService
  ) { 
    super();
    this._vineyardAreaQuestionGenerator = new VineyardAreaQuestionGenerator(4, 1, this.spellEnricherService);
    this._appellationQuestionGenerator = new AppellationQuestionGenerator(4, 1, this.spellEnricherService);
    //this._areaOfAppellationQuestionGenereator = new AreaOfAppellationQuestionGenerator(4, 1, this.spellEnricherService);
    // this._allowedColorInAppellationQuestionGenerator = new AllowedColorInAppellationQuestionGenerator(this.spellEnricherService);
    this._specialQuestionGenerator = new SpecialQuestionGenerator(this.spellEnricherService);
    this._generators = [];
    this._generators.push(this._vineyardAreaQuestionGenerator);
    this._generators.push(this._appellationQuestionGenerator);
    this._generators.push(this._specialQuestionGenerator);
  }

  public override supports(quizConfiguration: QuizConfiguration): boolean {
      return quizConfiguration.includeQuestionsForWineRegions;
  }
  
  public override get generators(): AbstractBaseQuestionGenerator<IWineRegionData>[] {
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

class AppellationQuestionGenerator extends AbstractBaseQuestionGenerator<IWineRegionData> {
  
  private _areaOfAppellationQuestionGenerator: AreaOfAppellationQuestionGenerator;
  private _allowedColorInAppellationQuestionGenerator: AllowedColorInAppellationQuestionGenerator;
  //sprivate _allowedGrapeVarietiesInAppellationQuestionGenerator: AllowedGrapeVarietiesInAppellationQuestionGenerator;

  private _generators: BaseQuestionGenerator<IAppellationData>[];

  constructor(count: number, precision:number, spellenrichmentService: ISpellEnrichmentService) {
    super();

    this._areaOfAppellationQuestionGenerator = new AreaOfAppellationQuestionGenerator(4, 1, spellenrichmentService);
    this._allowedColorInAppellationQuestionGenerator = new AllowedColorInAppellationQuestionGenerator(spellenrichmentService);
    this._generators = [];
    this._generators.push(this._areaOfAppellationQuestionGenerator);
    this._generators.push(this._allowedColorInAppellationQuestionGenerator);
  }

  public override countQuestion(data: IWineRegionData): number {
    if (!this.checkQuestionsPossible(data))
      return 0;

    let count = 0;
    for(let appellation of data.appellations!) {
      this._generators.forEach(
        generator => count += generator.countQuestion(appellation) 
      );
    }
    return count;
  }

  public override makeQuestion(startIndex: number, data: IWineRegionData): IQuestion[] | undefined {
    if (!this.checkQuestionsPossible(data))
      return undefined;

    let questions: IQuestion[] = [];
    let index=0;
    for(let appellation of data.appellations!) {
      this._generators.forEach(
        generator => {
          let newQuestions = generator.makeQuestion(index+startIndex, appellation);
          if (newQuestions !== undefined) {
            questions = questions.concat(newQuestions);
            index += newQuestions.length;
          }
        } 
      );
    }
    return questions;
  }
    
  
  protected override checkQuestionsPossible(data: IWineRegionData): boolean {
    return data.appellations !== undefined;
  }
}

class AreaOfAppellationQuestionGenerator extends NumericQuestionGenerator<IAppellationData> {

  constructor(count: number, precision:number, spellenrichmentService: ISpellEnrichmentService) {
    super(count, precision, spellenrichmentService);
  }

  protected override checkQuestionsPossible(appellation: IAppellationData): boolean {
    return appellation.area != undefined;
  }

  protected override makeQuestionText(relativeIndex: number, appellation: IAppellationData): string {
    let enrichedWineRegionName = this.spellenrichmentService.enrichWineRegionName(appellation.name, 'wineRegion');
    return `Wie groß ist die Rebfläche von ${enrichedWineRegionName}? `;
  }
  
  protected override makeCorrectAnswers(relativeIndex: number, appellation: IAppellationData): IAnswer[] {
    return [{ name: appellation.area!.toString()+' ha', isCorrect: true }];
  }

  protected override makeFictiveAnswerText(appellation: IAppellationData, multiplicationFactor: number): string {
    let fictiveAmount: number = appellation.area! * multiplicationFactor;
    let roundedValue = round(fictiveAmount, this.precision);
    return `${roundedValue} ha`;
  }
}

class AllowedColorInAppellationQuestionGenerator extends BaseQuestionGenerator<IAppellationData> {

  constructor(spellenrichmentService: ISpellEnrichmentService) {
    super(4, spellenrichmentService );
  }

  protected override checkQuestionsPossible(appellation: IAppellationData): boolean {
    return appellation.legal !== undefined && appellation.legal.allowedColors !== undefined;
  }

  protected override makeQuestionText(relativeIndex: number, appellation: IAppellationData): string {
    let enrichedWineRegionName = this.spellenrichmentService.enrichWineRegionName(appellation.name, 'wineRegion');
    return `Welche Wine dürfen in ${enrichedWineRegionName} hergestellt werden? `;
  }
  
  private mapWineColor(wineColor: WineColor): string {
    switch(wineColor) {
      case WineColor.White:
        return "Weißwein (trocken)";
      case WineColor.LieblichWhite:
        return "Lieblicher Weißwein";
      case WineColor.Rose:
        return "Roséwein";
      case WineColor.Red:
        return "Rotwein";
      default:
        throw new RangeError();
    }
  }

  private makeWineTypeAnswer(wineColors: WineColor[], correct:boolean): IAnswer[] {
    let answerTexts: string[] = [];
    for (let wineColor of wineColors) {
      answerTexts.push(this.mapWineColor(wineColor));
    }
    let answers: IAnswer[] = [];
    answerTexts.forEach( 
      answer => answers.push({ name: answer , isCorrect:correct })
    )
    return answers;
  }

  protected override makeCorrectAnswers(relativeIndex: number, appellation: IAppellationData): IAnswer[] {
    return this.makeWineTypeAnswer(appellation.legal!.allowedColors!, true); 
  }

  protected override makeWrongAnswers(relativeIndex: number, appellation: IAppellationData, count: number): IAnswer[] {
    let allWineColors: WineColor[] = [ WineColor.White, WineColor.LieblichWhite, WineColor.Rose, WineColor.Red ];
    let wrongColors: WineColor[] = [];
    allWineColors.forEach(
      wineColor => {
        if (appellation.legal!.allowedColors!.indexOf(wineColor) == -1)
          wrongColors.push(wineColor);
      }
    )
    return this.makeWineTypeAnswer(wrongColors, false); 
  }
  
}

//class AllowedGrapeVarietiesInAppellationQuestionGenerator