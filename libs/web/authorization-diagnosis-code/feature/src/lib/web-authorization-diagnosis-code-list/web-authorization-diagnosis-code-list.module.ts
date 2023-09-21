

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebAuthorizationDiagnosisCodeListComponent } from './web-authorization-diagnosis-code-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebAuthorizationDiagnosisCodeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebAuthorizationDiagnosisCodeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebAuthorizationDiagnosisCodeListModule {}

