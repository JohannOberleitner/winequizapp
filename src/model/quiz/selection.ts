import { Answer } from "./answer";

export class SelectionCollection {

  _selections: Selection[] = [];

  constructor() {
  }

  add(selection: Selection) {
    this._selections.push(selection);
  }

  resultAll() {
    for (let selection of this._selections) {
      selection.result();
    }
  }

  get selections(): Selection[] {
    return this._selections;
  }

  get numberOfCorrectSelections(): number {
    let count = 0;
    for (let selection of this._selections) {
      if (selection.isSelectionCorrect() ) {
        count += 1;
      }
    }
    return count;
  }

  get isCompletelyCorrect(): boolean {
    for (let selection of this._selections) {
      if (!selection.isSelectionCorrect() ) {
        return false;
      }
    }
    return true;
  }
}

export class Selection {
  public readonly answer: Answer;
  public selected: boolean = false;
  public resulted: boolean = false;

  constructor (answer: Answer) {
    this.answer = answer;
  }

  public get name(): string {
    return this.answer.name;
  }

  public toggleState(): void {
    this.selected = !this.selected;
  }

  public result(): void {
    this.resulted = true;
  }

  public isSelectionCorrect(): boolean {
    return (this.selected && this.answer.isCorrect) ||
           (!this.selected && !this.answer.isCorrect);
  }

  public get correct(): boolean {
    return this.resulted && this.isSelectionCorrect();
  }
  public get incorrect(): boolean {
    return this.resulted && !this.isSelectionCorrect();
  }

  public get isCorrectlySelected(): boolean {
    return this.selected == this.answer.isCorrect;
  }
}
