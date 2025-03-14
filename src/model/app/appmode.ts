
export class AppMode {
  public showResults: boolean = false;
  public showQuiz: boolean = true;
  public resetPage: boolean = false;

  constructor() {
  }

  clone(): AppMode {
    let newAppMode = new AppMode();
    newAppMode.showResults = this.showResults;
    newAppMode.resetPage = this.resetPage;
    newAppMode.showQuiz = this.showQuiz;
    return newAppMode;
  }

  makeQuizPageVisible() {
    this.showQuiz = true;
    this.showResults = false;
  }

  makeResultsPageVisible() {
    this.showResults = true;
    this.showQuiz = false;
  }

  makeNewQuiz() {
    this.resetPage = true;
    this.makeQuizPageVisible();
  }

  removeResetPageFlag() {
    this.resetPage = false;
  }

}