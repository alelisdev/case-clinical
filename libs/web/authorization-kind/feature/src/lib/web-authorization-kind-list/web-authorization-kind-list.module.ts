

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebAuthorizationKindListComponent } from './web-authorization-kind-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebAuthorizationKindListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebAuthorizationKindListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebAuthorizationKindListModule {}

