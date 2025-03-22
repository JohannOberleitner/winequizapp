import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../../model/quiz/quiz';
import { AppMode } from '../../model/app/appmode';
import { FlowTarget } from '../../model/app/flow-targets';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-page',
  imports: [FormsModule],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent {

  @Input({required:true}) quiz: Quiz = new Quiz;
  @Input({required:true}) appMode!: AppMode;
  @Output() pageLeftEvent = new EventEmitter<FlowTarget>();

  public checkedWrongResultsOnly: boolean = true;

  constructor() {

  }

  changeCheckWrongResutsOnly(checked:boolean) {
    alert('Checked:'+checked);
  }

  detailedResults_clicked() {
    if (this.checkedWrongResultsOnly) {
      this.pageLeftEvent.emit(FlowTarget.DetailedResultsForErrors);
    } else {
      this.pageLeftEvent.emit(FlowTarget.DetailedResults);
    }
  }

  newQuiz_clicked() {
    this.pageLeftEvent.emit(FlowTarget.NewQuiz);
  }
}
