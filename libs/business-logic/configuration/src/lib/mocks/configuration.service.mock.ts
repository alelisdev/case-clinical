import { Observable, ReplaySubject, Subject } from 'rxjs';

import { IConfigurationService } from '../configuration.service';
import { Injectable, Optional } from '@angular/core';
import { ConfigurationContext } from '../configuration-context';

@Injectable()
export class ConfigurationServiceMock<T> implements IConfigurationService<T> {
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

  public set settings(value: T) {
    this.config = value;
    if (this.config) {
      this.settingsSubject.next(this.config);
    }
  }

  // #endregion Public Accessors (2)
}
