

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebRecommendedOrderAuthorizationListComponent } from './web-recommended-order-authorization-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebRecommendedOrderAuthorizationListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebRecommendedOrderAuthorizationListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebRecommendedOrderAuthorizationListModule {}

