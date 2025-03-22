import { Answer } from "./answer";

export interface IQuestion {
  readonly index: number;
  readonly text: string;
  readonly answers: Answer[];
}

export class Question implements IQuestion {
  // TODO: this could be dropped, it is identical to IQuestion.

  _index: number;
  _text: string;
  _answers: Answer[] = [];

  constructor(question: IQuestion) {
    this._index = question.index;
    this._text = question.text;
    this._answers = question.answers;
  }

  get index(): number {
    return this._index;
  }

  get answers(): Answer[] {
    return this._answers;
  }

  get text(): string {
    return this._text;

  }

  public static create(index: number, text: string, answers: Answer[]): Question {
    return new Question({ index: index, text: text, answers: answers } as IQuestion);
  }
}