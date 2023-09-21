

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureVendorStatusFeatureStore } from '@case-clinical/web/procedure-vendor-status/shared'
import { WebProcedureVendorStatusSelectComponent } from './web-procedure-vendor-status-select.component'
import { WebProcedureVendorStatusSelectTableViewComponent } from './web-procedure-vendor-status-select-table-view.component'
import { WebFormsUiProcedureVendorStatusComponent } from './web-procedure-vendor-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureVendorStatusGridComponent } from './web-procedure-vendor-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureVendorStatusComponent, 
        WebProcedureVendorStatusSelectTableViewComponent, 
        WebProcedureVendorStatusSelectComponent,
        WebProcedureVendorStatusGridComponent
    ],
  declarations: [
        WebFormsUiProcedureVendorStatusComponent, 
        WebProcedureVendorStatusSelectTableViewComponent, 
        WebProcedureVendorStatusSelectComponent,
        WebProcedureVendorStatusGridComponent
    ],
  imports: [
    CommonModule,
    FormlySelectModule,
    ReactiveFormsModule,
    WebCoreFeatureModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiGridModule,
    WebUiSelectFormModule,
    WebUiFormlyDesignerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'procedure-vendor-status-select',
          component: WebProcedureVendorStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-vendor-status-grid',
          component: WebProcedureVendorStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureVendorStatusFeatureStore],
})
export class WebFormsUiProcedureVendorStatusSelectModule {}
