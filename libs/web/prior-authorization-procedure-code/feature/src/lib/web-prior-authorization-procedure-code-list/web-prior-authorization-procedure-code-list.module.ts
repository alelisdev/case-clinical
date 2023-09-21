

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebPriorAuthorizationProcedureCodeListComponent } from './web-prior-authorization-procedure-code-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebPriorAuthorizationProcedureCodeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebPriorAuthorizationProcedureCodeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebPriorAuthorizationProcedureCodeListModule {}

