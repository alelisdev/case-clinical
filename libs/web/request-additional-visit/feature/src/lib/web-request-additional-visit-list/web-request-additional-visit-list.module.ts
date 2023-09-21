

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebRequestAdditionalVisitListComponent } from './web-request-additional-visit-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebRequestAdditionalVisitListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebRequestAdditionalVisitListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebRequestAdditionalVisitListModule {}

