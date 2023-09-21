

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebContractTermListComponent } from './web-contract-term-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebContractTermListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebContractTermListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebContractTermListModule {}

