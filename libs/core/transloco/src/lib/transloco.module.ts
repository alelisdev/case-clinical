import {
    Translation,
    TRANSLOCO_CONFIG,
    TRANSLOCO_LOADER,
    translocoConfig,
    TranslocoModule,
    TranslocoService,
} from '@ngneat/transloco'
import { APP_INITIALIZER, NgModule } from '@angular/core'
//import { environment } from 'environments/environment'
import { TranslocoHttpLoader } from './transloco.http-loader'
import { lastValueFrom } from 'rxjs'

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            // Provide the default Transloco configuration
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'tr',
                        label: 'Turkish',
                    },
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: process.env.production == "True",
            }),
        },
        {
            // Provide the default Transloco loader
            provide: TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader,
        },
        {
            // Preload the default language before the app starts to prevent empty/jumping content
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory:
                (translocoService: TranslocoService): any =>
                async (): Promise<Translation> => {
                    const defaultLang = translocoService.getDefaultLang()
                    translocoService.setActiveLang(defaultLang)
                    return await lastValueFrom(translocoService.load(defaultLang))
                },
            multi: true,
        },
    ],
})
export class TranslocoCoreModule {}
