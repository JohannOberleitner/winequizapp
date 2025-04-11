export class QuizConfiguration {

  public includeQuestionsForCountryData : boolean = false;
  public includeQuestionsForGrapeVarienties : boolean = false;
  public includeQuestionsForWineRegions : boolean = false;

  constructor() {
  }

  private _cache: QuizConfigurationCache|undefined;

  public hasTotalNumberOfQuestions(): boolean {
    return this._cache !== undefined;
  }

  public get totalNumberOfQuestions(): number {
    return this._cache!.totalNumberOfQuestions;
  }
  public set totalNumberOfQuestions(newValue: number) {
    if (this._cache === undefined)
      this._cache = new QuizConfigurationCache();
    this._cache.totalNumberOfQuestions = newValue;
  }

  public clearCache(): void {
    this._cache = undefined;
  }
}

export class QuizConfigurationCache {
  totalNumberOfQuestions: number = 0;
  
  constructor() {
  }
}