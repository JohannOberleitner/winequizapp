import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz/quiz';
import { Answer } from '../model/quiz/answer';
import { Question } from '../model/quiz/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionRepositoryService {

  constructor() { }

  public createQuiz(): Quiz {
    let quiz = new Quiz();
    quiz.add(this.makeQuestion1());
    quiz.add(this.makeQuestion2());
    return quiz;
  }

  private addQuestion1(quiz: Quiz) {
    /*let answers: Answer[] = [];
    answers.push(new Answer("Tokaj", true));
    answers.push(new Answer("Somlö", true));
    answers.push(new Answer("Villanyi", false));
    answers.push(new Answer("Eger", false));
    answers.push(new Answer("Nordufer des Balaton", true));
    let question = new Question('Wo wird Furmint angebaut', answers);*/
    quiz.add(this.makeQuestion1());
  }
  private makeQuestion1(): Question {
    let s = '{ "text": "Wo wird Furmint angebaut", "answers": '+
            '[ { "name": "Tokaj", "isCorrect": true },' +
              '{ "name": "Somlö", "isCorrect": true },' +
              '{ "name": "Villanyi", "isCorrect": false },' +
              '{ "name": "Eger", "isCorrect": false },' +
              '{ "name": "Nordufer des Balaton", "isCorrect": true }'+
              ']}';
    let question: Question = JSON.parse(s);
    return question;
  }

  private makeQuestion2(): Question {
    let answers:Answer[] = [];
    answers.push(Answer.create("Kalk und Sand über Felstgestein", true));
    answers.push(Answer.create("Glimmerschiefer"));
    answers.push(Answer.create("Tuff", true));
    answers.push(Answer.create("Löss"));
    return Question.create('Welche Böden sind in Eger DHC vorherrschend', answers);
  }
}
