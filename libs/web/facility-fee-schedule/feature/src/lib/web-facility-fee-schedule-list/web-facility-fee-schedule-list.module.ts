

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebFacilityFeeScheduleListComponent } from './web-facility-fee-schedule-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebFacilityFeeScheduleListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebFacilityFeeScheduleListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebFacilityFeeScheduleListModule {}

