import { Answer } from "./answer";

export interface IQuestion {
  readonly text: string;
  readonly answers: Answer[];
}

export class Question implements IQuestion {
  // TODO: this could be dropped, it is identical to IQuestion.

  _text: string;
  _answers: Answer[] = [];

  constructor(question: IQuestion) {
    this._text = question.text;
    this._answers = question.answers;
  }

  get answers(): Answer[] {
    return this._answers;
  }

  get text(): string {
    return this._text;

  }

  public static create(text: string, answers: Answer[]): Question {
    return new Question({ text: text, answers: answers } as IQuestion);
  }
}