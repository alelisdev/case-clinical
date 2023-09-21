

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebClinicalProviderSpecialtyListComponent } from './web-clinical-provider-specialty-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebClinicalProviderSpecialtyListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebClinicalProviderSpecialtyListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebClinicalProviderSpecialtyListModule {}

