

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebMedicalRecordStatusListComponent } from './web-medical-record-status-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebMedicalRecordStatusListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebMedicalRecordStatusListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebMedicalRecordStatusListModule {}

