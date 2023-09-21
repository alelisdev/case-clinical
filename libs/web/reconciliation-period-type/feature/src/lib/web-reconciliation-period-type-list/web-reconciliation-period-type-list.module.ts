

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebReconciliationPeriodTypeListComponent } from './web-reconciliation-period-type-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebReconciliationPeriodTypeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebReconciliationPeriodTypeListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebReconciliationPeriodTypeListModule {}

