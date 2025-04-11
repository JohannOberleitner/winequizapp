import { IQuestion, Question } from "../../model/quiz/question";
import { Quiz } from "../../model/quiz/quiz";
import { QuizConfiguration } from "../../model/quiz/quiz-configuration";
import { BaseQuestionGenerator } from "./base-generators";

export interface IBaseQuestionGeneratorService {
  supports(quizConfiguration: QuizConfiguration): boolean;
  countQuestions(quizConfiguration:QuizConfiguration): number;
  addQuestions(quiz:Quiz, quizConfiguration:QuizConfiguration):void;
}

export abstract class BaseQuestionGeneratorService<T> implements IBaseQuestionGeneratorService {

  public abstract supports(quizConfiguration: QuizConfiguration): boolean;
  public abstract get generators(): BaseQuestionGenerator<T>[]; 
  public abstract get data(): T[];

  protected add(quiz: Quiz, question: IQuestion | undefined): number {
    if (question != undefined) {
      quiz.add(new Question(question));
      return 1;
    }
    return 0;
  }

  protected count(question: IQuestion | undefined): number {
    if (question != undefined) {
      return 0;
    }
    return 1;
  } 

  public countQuestions(quizConfiguration:QuizConfiguration): number {
    if (!this.supports(quizConfiguration))
      return 0;

    let questionCount:number = 0;
    let dataSet = this.data;
    let generators = this.generators;
    for (let item of dataSet) {
      for (let generator of generators) {
        questionCount += generator.countQuestion(item);  
      }
    }
    return questionCount;
  }

  public addQuestions(quiz:Quiz, quizConfiguration:QuizConfiguration):void {
    if (!this.supports(quizConfiguration))
      return;

    let nextQuestionIndex:number = quiz.numberOfQuestions + 1;
    let dataSet = this.data;
    let generators = this.generators;
    for (let item of dataSet) {
      for (let generator of generators) {
        let questions = generator.makeQuestion(nextQuestionIndex, item);
        if (questions !== undefined) {
          for (let question of questions) {
            nextQuestionIndex += this.add(quiz, question);
          }
        }
      }
    }
  }
}