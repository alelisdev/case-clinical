

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebPriorAuthorizationDiagnosisCodeListComponent } from './web-prior-authorization-diagnosis-code-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebPriorAuthorizationDiagnosisCodeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebPriorAuthorizationDiagnosisCodeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebPriorAuthorizationDiagnosisCodeListModule {}

