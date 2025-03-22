import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Answer } from '../../model/quiz/answer';
import { Quiz } from '../../model/quiz/quiz';
import { Question } from '../../model/quiz/question';
import { QuizMode } from '../../model/quiz/quizMode';
import { SelectionCollection, Selection } from '../../model/quiz/selection';
import { AppMode } from '../../model/app/appmode';
import { FlowTarget } from '../../model/app/flow-targets';

@Component({
  selector: 'app-multiple-choice',
  imports: [],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.css'
})
export class MultipleChoiceComponent implements OnInit, OnChanges {

  @Input({required:true}) quiz!: Quiz;

  @Input({required:true}) appMode!: AppMode;

  @Output() doneEvent = new EventEmitter<void>();

  _selections: SelectionCollection | undefined;
  question: Question | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.prepareSelections(this.quiz);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.appMode.resetPage) {
      console.log('in resetPage');
      this.appMode.removeResetPageFlag();
      this.prepareSelections(this.quiz);
    } 
    //else if (changes['quiz'].) {
      this.prepareSelections(this.quiz);
    //}
  }

  prepareSelections(quiz: Quiz) {
    this.question = quiz.currentQuestion;

    this._selections = quiz.selectionForCurrentQuestion;
    this.addAnswersToSelections(quiz);
  }

  addAnswersToSelections(quiz: Quiz) {
    let answers = this.question!.answers;
    this._selections = quiz.selectionForCurrentQuestion;

    if (quiz.userCanAnswerQuestions) {
      for(let answer of answers) {
        this._selections.add(new Selection(answer));
        console.log(answer.name);
      }
    }
  }

  moveToNextQuestion() {
    this.quiz.moveToNextQuestion();
    this.prepareSelections(this.quiz);
  }

  moveToReviewResultsMode() {
    this.doneEvent.emit();
    this.quiz.switchQuizMode(QuizMode.ShowResults);
    this.quiz.moveToInitialQuestion();
    this.prepareSelections(this.quiz);
  }

  public clickedAnswer(selection: Selection):void {
    if (this.quiz.userCanAnswerQuestions) {
      selection.toggleState();
    }
  }

  public nextQuestionClicked():void {
    if (this.quiz.userCanAnswerQuestions) {
      this.quiz.selectionForCurrentQuestion.resultAll();
      //let result = MultipleChoiceComponent.checkResults(this.quiz.selectionForCurrentQuestion!);
    }

    //let s = `Fehler: ${result.incorrect.length}`;
    //alert(s);
    if (this.hasFurtherQuestions()) {
      this.moveToNextQuestion();
    } else {
      this.moveToReviewResultsMode();
    }
  }


  public hasFurtherQuestions(): boolean {
    return this.quiz.hasFurtherQuestions();
  }

  public get selections(): SelectionCollection|undefined {
    return this._selections;
  }
  /*public static checkResults(selections: SelectionCollection): ResultCollection {
    let result = new ResultCollection(selections);
    return result;
  }*/
}




/*
class ResultCollection {

  correct: Selection[] = [];
  incorrect: Selection[] = [];

  constructor(selections: Selection[]) {
    for(let selection of selections) {
      if (selection.isCorrectlySelected) {
        this.correct.push(selection);
      } else {
        this.incorrect.push(selection);
      }
    }
  }
}
  */
