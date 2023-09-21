

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebProcedureSiteListComponent } from './web-procedure-site-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebProcedureSiteListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebProcedureSiteListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebProcedureSiteListModule {}

