import { APP_INITIALIZER, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MultipleChoiceComponent } from "../questions/multiple-choice/multiple-choice.component";
import { Quiz } from '../model/quiz/quiz';
import { Question } from '../model/quiz/question';
import { Answer } from '../model/quiz/answer';
import { QuestionRepositoryService } from '../service/question-repository.service';
import { ResultPageComponent } from "../results/result-page/result-page.component";
import { AppMode } from '../model/app/appmode';
import { FlowTarget } from '../model/app/flow-targets';
import { QuizConfiguratorComponent } from '../questions/quiz-configurator/quiz-configurator.component';
import { QuizConfiguration } from '../model/quiz/quiz-configuration';
import { QuestionFilterComponent } from "../questions/question-filter/question-filter.component";

export function loadCrucialData() {
  return function() {
    return delay(3000);
  }
}

export function delay(delay: number) {
  return function() {
    return new Promise(function(resolve) {
      setTimeout(resolve, delay);
    });
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MultipleChoiceComponent, ResultPageComponent, QuizConfiguratorComponent, QuestionFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'winequizapp';

  quizConfiguration: QuizConfiguration = new QuizConfiguration(); 
  quiz: Quiz = new Quiz;

  //showResultPage: boolean = false;
  appMode: AppMode = new AppMode();

  constructor(private questionRepositoryService: QuestionRepositoryService) {
  }

  ngOnInit(): void {
      this.quiz = this.questionRepositoryService.createQuiz();
  }

  questionFilterClicked() {
    this.appMode.makeFilterPageVisible();
  }

  quizConfiguredClicked(quiz: Quiz) {
    this.quiz = quiz;
    this.appMode.makeQuizPageVisible();
  }

  answersCompletedClicked() {
    this.appMode.makeResultsPageVisible();
  }

  resultsPageLeft(target: FlowTarget) {
    if (target == FlowTarget.DetailedResults || target == FlowTarget.DetailedResultsForErrors) {
      this.quiz.setShowOnlyWrongQuestions(target == FlowTarget.DetailedResultsForErrors);
      this.appMode.makeQuizPageVisible(target == FlowTarget.DetailedResults);
    } else {
      console.log('New Quiz');
      this.quiz = this.questionRepositoryService.createQuiz();
      let newAppMode = this.appMode.clone();
      newAppMode.makeNewQuiz();
      this.appMode = newAppMode;
    }
  }

  /*
  private addQuestion1(quiz: Quiz) {
    let answers: Answer[] = [];
    answers.push(new Answer("Tokaj", true));
    answers.push(new Answer("Somlö", true));
    answers.push(new Answer("Villanyi", false));
    answers.push(new Answer("Eger", false));
    answers.push(new Answer("Nordufer des Balaton", true));
    let question = new Question('Wo wird Furmint angebaut', answers);
    this.quiz.add(question);
  }

  private addQuestion2(quiz: Quiz) {
    let answers:Answer[] = [];
    answers.push(new Answer("Kalk und Sand über Felstgestein", true));
    answers.push(new Answer("Glimmerschiefer", false));
    answers.push(new Answer("Tuff", true));
    answers.push(new Answer("Löss", false));
    let question = new Question('Welche Böden sind in Eger DHC vorherrschend', answers);
    this.quiz.add(question);
  } */
}
