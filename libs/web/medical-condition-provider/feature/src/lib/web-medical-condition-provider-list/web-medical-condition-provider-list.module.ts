

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebMedicalConditionProviderListComponent } from './web-medical-condition-provider-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebMedicalConditionProviderListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebMedicalConditionProviderListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebMedicalConditionProviderListModule {}

