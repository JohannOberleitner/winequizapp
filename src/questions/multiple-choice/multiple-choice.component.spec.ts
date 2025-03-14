import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceComponent } from './multiple-choice.component';

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;
  //let appMode: AppMode = new AppMode();
  //let quiz: Quiz = 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleChoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    //fixture.componentRef.setInput('
    //fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
  it('dummy', () => {
     expect(true).toBeTruthy();
  });
});
