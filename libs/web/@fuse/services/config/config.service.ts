import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { merge } from 'lodash-es';
import { FUSE_APP_CONFIG } from '@fuse/services/config/config.constants';

@Injectable({
    providedIn: 'root'
})
export class FuseConfigService
{
    private _config: BehaviorSubject<any>;
    private _formlyConfig: { language: string, currency: string, dateFormat: string, timeFormat: string }
    /**
     * Constructor
     */
    constructor(@Inject(FUSE_APP_CONFIG) config: any)
    {
        // Private
        const savedConfigStr = localStorage.getItem('config');
        this._config = new BehaviorSubject(savedConfigStr ? JSON.parse(savedConfigStr) : config);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    set config(value: any)
    {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);
        localStorage.setItem('config', JSON.stringify(config))
        // Execute the observable
        this._config.next(config);
    }

    get config$(): Observable<any>
    {
        return this._config.asObservable();
    }

    get formlyConfig(): { language: string, currency: string, dateFormat: string } {
      return this._formlyConfig;
    }

    setFormlyConfig(language: string, currency: string, dateFormat: string, timeFormat: string) {
      console.log(language, currency, dateFormat)
      this._formlyConfig = { language, currency, dateFormat, timeFormat }
    }

    get agGridClassName$(): Observable<string>
    {
      return this.config$.pipe(
        switchMap( config => {
          return of(`ag-theme-${config.agGridTheme}`);
        })
      )
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void
    {
        // Set the config
        this._config.next(this.config);
    }
}

