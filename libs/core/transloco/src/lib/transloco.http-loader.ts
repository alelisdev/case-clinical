import { Injectable, Injector } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, EMPTY, Observable, tap } from 'rxjs'
import { HashMap, Translation, TranslocoLoader } from '@ngneat/transloco'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { of } from 'zen-observable'

@Injectable({
    providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private injector:Injector, private readonly _client: WebCoreDataAccessService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get translation
     *
     * @param lang
     */
    getTranslation(lang: string): Observable<Translation> {
        const gqlClient = this._client;
        return new Observable(function subscribe(observer: { next: (arg0: HashMap<any> | undefined) => void; complete: () => void }) {
            gqlClient.userTranslations().pipe(catchError( () => {
                observer.next({});
                observer.complete();
                return EMPTY;
            } )).forEach(res => {
                const init : HashMap = {}
                if(res.error) {
                    observer.next(init);
                } else {
                    const translations = res.data.items?.reduce((prevData, translation) => {
                        if (translation.name && translation.languageCode == lang) {
                            prevData[translation.name] = translation.translation
                        }
                        return prevData
                    }, init)
                    observer.next(translations);
                }
                observer.complete();
            })
        });

        // return this._httpClient.get<Translation>(`./assets/i18n/${lang}.json`)
    }
}
