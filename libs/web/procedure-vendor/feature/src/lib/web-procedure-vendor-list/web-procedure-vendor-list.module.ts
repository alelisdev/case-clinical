

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UtilitySharedModule } from '@case-clinical/web/shared/ui'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebProcedureVendorListComponent } from './web-procedure-vendor-list.component'
import { WebDatatableFeatureModule } from '@case-clinical/web/datatable/feature';
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiFormModule } from '@case-clinical/web/ui/form'

@NgModule({
  declarations: [WebProcedureVendorListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WebProcedureVendorListComponent }]),
    UtilitySharedModule,
    WebCoreFeatureModule,
    WebDatatableFeatureModule,
    WebUiFormlyDesignerModule,
    WebUiFormModule,
  ],
})
export class WebProcedureVendorListModule {}

