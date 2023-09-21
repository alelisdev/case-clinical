

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDocumentListComponent } from './web-document-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';

@NgModule({
  declarations: [WebDocumentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebDocumentListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
  ],
})
export class WebDocumentListModule {}

