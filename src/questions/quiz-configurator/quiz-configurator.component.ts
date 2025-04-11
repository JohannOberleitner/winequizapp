import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppMode } from '../../model/app/appmode';
import { QuizConfiguration } from '../../model/quiz/quiz-configuration';

@Component({
  selector: 'app-quiz-configurator',
  imports: [FormsModule],
  templateUrl: './quiz-configurator.component.html',
  styleUrl: './quiz-configurator.component.css'
})
export class QuizConfiguratorComponent {

  @Input({required:true}) appMode!: AppMode;
  @Input({required:true}) quizConfiguration!: QuizConfiguration;

  public includeQuestionsForCountryData: boolean = false;
  public includeQuestionsForGrapeVarieties: boolean = false;
  public includeQuestionsForWineRegions: boolean = false;

  @Output() questionFilterEvent = new EventEmitter<void>();

  constructor() {
  }

  
  filterQuestions_clicked() {
    this.quizConfiguration.includeQuestionsForCountryData = this.includeQuestionsForCountryData;
    this.quizConfiguration.includeQuestionsForGrapeVarienties = this.includeQuestionsForGrapeVarieties;
    this.quizConfiguration.includeQuestionsForWineRegions = this.includeQuestionsForWineRegions;

    this.quizConfiguration.clearCache();
    this.questionFilterEvent.emit();
  }  
}
