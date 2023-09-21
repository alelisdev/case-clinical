import { Injectable } from '@angular/core'
import { BehaviorSubject, debounceTime } from 'rxjs'

@Injectable()
export class FormRouterKeyService {
  private routerKeyMap = {};
  private _routerKeys$ = new BehaviorSubject({});
  routerKeys$ = this._routerKeys$.pipe(debounceTime(500))

  setRouterKey(key: string, value: any) {
    if(this.routerKeyMap[key] !== value) {
      if(!value) value = undefined;
      this.routerKeyMap = {
        ...this.routerKeyMap,
        [key]: value,
      }
      this._routerKeys$.next(this.routerKeyMap);
    }
  }

  destroy() {
    this._routerKeys$.complete();
  }
}
