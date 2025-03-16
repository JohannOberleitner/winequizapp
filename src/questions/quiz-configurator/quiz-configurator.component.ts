import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppMode } from '../../model/app/appmode';
import { Quiz } from '../../model/quiz/quiz';
import { QuestionRepositoryService } from '../../service/question-repository.service';
import { QuizGeneratorService } from '../../service/quiz-generator.service';

@Component({
  selector: 'app-quiz-configurator',
  imports: [],
  templateUrl: './quiz-configurator.component.html',
  styleUrl: './quiz-configurator.component.css'
})
export class QuizConfiguratorComponent {

  @Input({required:true}) quiz!: Quiz;

  @Input({required:true}) appMode!: AppMode;

  @Output() quizConfiguredEvent = new EventEmitter<Quiz>();

  constructor(private quizGeneratorServie: QuizGeneratorService, private questionRepositoryService: QuestionRepositoryService) {

  }

  startQuiz_clicked() {
    console.log('YYY');
    let quiz = this.quizGeneratorServie.createCountryQuiz();
    this.quizConfiguredEvent.emit(quiz);
  }
}
