
export interface IAnswer {
  readonly name: string;
  readonly isCorrect: boolean;
}

export class Answer implements IAnswer {

  public readonly name: string;
  public readonly isCorrect: boolean;

  constructor(answer: IAnswer) {
    this.name = answer.name;
    this.isCorrect = answer.isCorrect;
  }

  public static create(name: string, isCorrect: boolean = false): Answer {
    return new Answer({ name: name, isCorrect: isCorrect } as IAnswer);
  }
}