import { Injectable, Optional } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ConfigurationContext } from './configuration-context';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService<T> implements IConfigurationService<T> {
  // #region Properties (3)

  private settingsSubject: Subject<T> = new ReplaySubject<T>(1);

  public readonly settings$: Observable<T> = this.settingsSubject.asObservable();

  config!: T;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(@Optional() context: ConfigurationContext<T>) {
    if (context) {
      this.settingsSubject.next(context.config);
    }
  }

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get settings(): T {
    return this.config;
  }

  public set settings(value) {
    this.config = value;
    this.settingsSubject.next(this.config);
  }

  // #endregion Public Accessors (2)
}
export interface IConfigurationService<T> {
  // #region Properties (1)

  readonly settings$: Observable<T>

  // #endregion Properties (1)
}
