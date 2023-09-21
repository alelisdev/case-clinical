import { FormService } from './../form.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, switchMap } from 'rxjs';

@Injectable()
export class DataContextService {
  private data: any
  private dataStream: BehaviorSubject<any> = new BehaviorSubject(null);
  public dataStream$ = this.dataStream.asObservable();

  constructor(private formService: FormService) { }

  next(data) {
    this.dataStream.next(data);
  }

  setData(data: any) { this.data = data }

  getDataStream() {
    return this.dataStream$;
  }

  getData() {
    return this.data;
  }

  getValue(key: string, returnRawValue=false) {
    return this.formService.getValueForKey(key, this.data, returnRawValue);
  }

  parseStatement(statement: string, data = null) {
    if(!statement) return '';

    let index = statement.indexOf("{");
    while (index !== -1) {
      const endIndex = statement.indexOf('}');
      if(endIndex === -1) break;

      const key = statement.substring(index + 1, endIndex);
      const value = data ? this.formService.getValueForKey(key, data) : this.getValue(key);
      const dummyStr = statement.substring(index, endIndex + 1)
      statement = statement.replace(dummyStr, value);
      index = statement.indexOf('{');
    }
    return statement;
  }

  parseStatementStream(statement: string) {
    return this.dataStream$.pipe(
      switchMap((data) => {
        return of(this.parseStatement(statement, data))
      })
    )
  }
}
