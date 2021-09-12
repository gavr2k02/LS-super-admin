import { Subject } from 'rxjs';

export abstract class RxjsService<T> {
  private readonly _subject: Subject<T | T[]>;

  constructor() {
    this._subject = new Subject();
  }

  protected next(data: T[]): void {
    this._subject.next(data);
  }

  protected get subject(): Subject<T | T[]> {
    return this._subject;
  }
}
