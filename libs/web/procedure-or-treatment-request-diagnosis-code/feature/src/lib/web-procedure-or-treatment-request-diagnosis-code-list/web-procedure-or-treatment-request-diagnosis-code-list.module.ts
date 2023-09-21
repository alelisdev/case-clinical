

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebProcedureOrTreatmentRequestDiagnosisCodeListComponent } from './web-procedure-or-treatment-request-diagnosis-code-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebProcedureOrTreatmentRequestDiagnosisCodeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebProcedureOrTreatmentRequestDiagnosisCodeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeListModule {}

