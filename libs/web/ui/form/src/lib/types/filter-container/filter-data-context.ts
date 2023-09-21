import { BehaviorSubject } from 'rxjs';
import { FetchQuery } from "./query";

export class FilterDataContext {
  private _query: FetchQuery;
  public get query(): FetchQuery {
    return this._query;
  }
  public set query(value: FetchQuery) {
    this._query = value;
  }

  data: Record<string, any>;

  private dataStream: BehaviorSubject<any> = new BehaviorSubject(null);
  public dataStream$ = this.dataStream.asObservable();

  constructor() {
    this._query = new FetchQuery({})
  }

  next(data) {
    this.dataStream.next(data);
  }

}
