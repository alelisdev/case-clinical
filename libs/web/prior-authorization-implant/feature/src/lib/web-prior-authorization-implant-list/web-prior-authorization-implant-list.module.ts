

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebPriorAuthorizationImplantListComponent } from './web-prior-authorization-implant-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebPriorAuthorizationImplantListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebPriorAuthorizationImplantListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebPriorAuthorizationImplantListModule {}

