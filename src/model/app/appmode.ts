
export class AppMode {
  public showConfigurator: boolean = true;
  public showFilter: boolean = false;
  public showQuiz: boolean = false;
  public showAllQuestions: boolean = true;
  public showResults: boolean = false;
  public resetPage: boolean = false;

  constructor() {
  }

  clone(): AppMode {
    let newAppMode = new AppMode();
    newAppMode.showConfigurator = this.showConfigurator;
    newAppMode.showFilter = this.showFilter;
    newAppMode.showQuiz = this.showQuiz;
    newAppMode.showResults = this.showResults;
    newAppMode.resetPage = this.resetPage;
    return newAppMode;
  }

  makeConfigurationPageVisible() {
    this.showConfigurator = true;
    this.showFilter = false;
    this.showQuiz = false;
    this.showResults = false;
  }

  makeFilterPageVisible() {
    this.showConfigurator = false;
    this.showFilter = true;
    this.showQuiz = false;
    this.showResults = false;
  }

  makeQuizPageVisible(showAllPages: boolean = true) {
    this.showConfigurator = false;
    this.showFilter = false;
    this.showQuiz = true;
    this.showResults = false;
    this.showAllQuestions = showAllPages;
  }

  makeResultsPageVisible() {
    this.showConfigurator = false;
    this.showFilter = false;
    this.showQuiz = false;
    this.showResults = true;
  }

  makeNewQuiz() {
    this.resetPage = true;
    this.makeConfigurationPageVisible();
  }

  removeResetPageFlag() {
    this.resetPage = false;
  }

}