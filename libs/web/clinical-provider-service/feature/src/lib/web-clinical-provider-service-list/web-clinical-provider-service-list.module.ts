

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebClinicalProviderServiceListComponent } from './web-clinical-provider-service-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebClinicalProviderServiceListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebClinicalProviderServiceListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebClinicalProviderServiceListModule {}

