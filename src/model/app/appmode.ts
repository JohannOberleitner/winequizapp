
export class AppMode {
  public showConfigurator: boolean = true;
  public showQuiz: boolean = false;
  public showResults: boolean = false;
  public resetPage: boolean = false;

  constructor() {
  }

  clone(): AppMode {
    let newAppMode = new AppMode();
    newAppMode.showConfigurator = this.showConfigurator;
    newAppMode.showQuiz = this.showQuiz;
    newAppMode.showResults = this.showResults;
    newAppMode.resetPage = this.resetPage;
    return newAppMode;
  }

  makeConfigurationPageVisible() {
    this.showConfigurator = true;
    this.showQuiz = false;
    this.showResults = false;
  }

  makeQuizPageVisible() {
    this.showConfigurator = false;
    this.showQuiz = true;
    this.showResults = false;
  }

  makeResultsPageVisible() {
    this.showConfigurator = false;
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