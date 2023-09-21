

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDiagnosisCodeListComponent } from './web-diagnosis-code-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebDiagnosisCodeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebDiagnosisCodeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebDiagnosisCodeListModule {}

