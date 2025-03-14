import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../../model/quiz/quiz';
import { AppMode } from '../../model/app/appmode';
import { FlowTarget } from '../../model/app/flow-targets';

@Component({
  selector: 'app-result-page',
  imports: [],
  templateUrl: './result-page.component.html',
  styleUrl: './result-page.component.css'
})
export class ResultPageComponent {

  @Input({required:true}) quiz: Quiz = new Quiz;
  @Input({required:true}) appMode!: AppMode;
  @Output() pageLeftEvent = new EventEmitter<FlowTarget>();

  constructor() {

  }

  detailedResults_clicked() {
    this.pageLeftEvent.emit(FlowTarget.DetailedResults);
  }

  newQuiz_clicked() {
    this.pageLeftEvent.emit(FlowTarget.NewQuiz);
  }
}
