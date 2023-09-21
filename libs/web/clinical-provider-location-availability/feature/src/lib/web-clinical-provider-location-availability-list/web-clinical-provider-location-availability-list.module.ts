

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebClinicalProviderLocationAvailabilityListComponent } from './web-clinical-provider-location-availability-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebClinicalProviderLocationAvailabilityListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebClinicalProviderLocationAvailabilityListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebClinicalProviderLocationAvailabilityListModule {}

