

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebCaseAccountPaymentListComponent } from './web-case-account-payment-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebCaseAccountPaymentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebCaseAccountPaymentListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebCaseAccountPaymentListModule {}

