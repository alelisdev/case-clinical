

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebPaymentApplicationMethodListComponent } from './web-payment-application-method-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebPaymentApplicationMethodListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebPaymentApplicationMethodListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebPaymentApplicationMethodListModule {}

