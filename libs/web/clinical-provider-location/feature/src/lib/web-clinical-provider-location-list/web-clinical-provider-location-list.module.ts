

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebClinicalProviderLocationListComponent } from './web-clinical-provider-location-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebClinicalProviderLocationListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebClinicalProviderLocationListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebClinicalProviderLocationListModule {}

