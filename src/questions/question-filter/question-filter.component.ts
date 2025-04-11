import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizGeneratorService } from '../../service/quiz-generator.service';
import { AppMode } from '../../model/app/appmode';
import { QuizConfiguration } from '../../model/quiz/quiz-configuration';
import { Quiz } from '../../model/quiz/quiz';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-filter',
  imports: [FormsModule],
  templateUrl: './question-filter.component.html',
  styleUrl: './question-filter.component.css'
})
export class QuestionFilterComponent  {

  @Input({required:true}) quiz!: Quiz;

  @Input({required:true}) appMode!: AppMode;
  @Input({required:true}) quizConfiguration!: QuizConfiguration;

  @Output() quizConfiguredEvent = new EventEmitter<Quiz>();

  public selectedQuestionFraction: number = 100.0;

  constructor(private quizGeneratorService: QuizGeneratorService ) {
  }
 

  startQuiz_clicked() {
    let quiz = this.quizGeneratorService.createQuiz(this.quizConfiguration);
    this.quizConfiguredEvent.emit(quiz);
  }

  private _totalQuestionCount: number = 0.0;

  public updateTotalQuestionCount(quizConfiguration: QuizConfiguration) {
    if (!quizConfiguration.hasTotalNumberOfQuestions()) {
      quizConfiguration.totalNumberOfQuestions = this.quizGeneratorService.countQuestions(quizConfiguration);
    }
  }

  public get totalQuestionCount(): number {
    this.updateTotalQuestionCount(this.quizConfiguration);
    return this.quizConfiguration.totalNumberOfQuestions;
  }

  public get selectedQuestionCount(): number {
    return 1+Math.floor(this.selectedQuestionFraction / 100.0 * (this.totalQuestionCount-1) );
  }
}
