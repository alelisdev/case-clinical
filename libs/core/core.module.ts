import { NgModule, Optional, SkipSelf } from '@angular/core'
import { AuthModule } from '@case-clinical/core/auth'
import { IconsModule } from '@case-clinical/core/icons'
import { TranslocoCoreModule } from '@case-clinical/core/transloco'

@NgModule({
    imports: [AuthModule, IconsModule, TranslocoCoreModule],
})
export class CoreModule {
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.')
        }
    }
}
