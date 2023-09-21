

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebProcedureOrTreatmentRequestListComponent } from './web-procedure-or-treatment-request-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebProcedureOrTreatmentRequestListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebProcedureOrTreatmentRequestListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebProcedureOrTreatmentRequestListModule {}

