import { Question } from "./question";
import { Selection, SelectionCollection } from "./selection";
import { QuizMode } from "./quizMode";

export class Quiz {

  _currentQuestionIndex: number;
  _questions: Question[];
  _selectionForQuestions: SelectionCollection[];
  _quizMode: QuizMode;

  constructor() {
    this._currentQuestionIndex = 0;
    this._questions = [];
    this._selectionForQuestions = [];
    this._quizMode = QuizMode.ChooseAnswers;
  }

  add(question: Question) {
    this._questions.push(question);
    this._selectionForQuestions.push(new SelectionCollection());
  }

  get questions(): Question[] {
    return this._questions;
  }

  get currentQuestion(): Question {
    return this._questions[this._currentQuestionIndex];
  }
  get currentQuestionIndex(): number {
    return this._currentQuestionIndex + 1;
  }
  get selectionForCurrentQuestion(): SelectionCollection {
    return this._selectionForQuestions[this._currentQuestionIndex];
  }

  get quizMode(): QuizMode {
    return this._quizMode;
  }

  get userCanAnswerQuestions(): boolean {
    return this._quizMode == QuizMode.ChooseAnswers;
  }

  moveToNextQuestion() {
    this._currentQuestionIndex += 1;
  }
  moveToInitialQuestion() {
    this._currentQuestionIndex = 0;
  }

  hasFurtherQuestions(): boolean {
    return this._currentQuestionIndex < this._questions.length - 1;
  }

  switchQuizMode(targetMode: QuizMode) {
    this._quizMode = targetMode;
  }

  get numberOfQuestions(): number {
    return this._questions.length;
  }

  get numberOfSubQuestions(): number {
    let count = 0;
    for (let question of this._questions) {
      count += question.answers.length;
    }
    return count;
  }

  get numberOfCompletelyCorrectQuestions(): number {
    let count = 0;
    for (let selectionsForQuestion of this._selectionForQuestions) {
      if (selectionsForQuestion.isCompletelyCorrect)
        count += 1;
    }
    return count;
  }

  get numberOfCorrectSubQuestions(): number {
    let count = 0;
    for (let selectionForCurrentQuestion of this._selectionForQuestions) {
      count += selectionForCurrentQuestion.numberOfCorrectSelections;
    }
    return count;
  }


}