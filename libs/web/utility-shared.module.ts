
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FeatureFlagDirective } from '@case-clinical/core/feature'
import { FeatureFlagGuard } from '@case-clinical/core/feature'


@NgModule({
    declarations: [FeatureFlagDirective],
    providers:[FeatureFlagGuard],
    exports: [
        FeatureFlagDirective
    ]
})
export class UtilitySharedModule {}


