

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'
import { WebProcedureVendorSelectComponent } from './web-procedure-vendor-select.component'
import { WebProcedureVendorSelectTableViewComponent } from './web-procedure-vendor-select-table-view.component'
import { WebFormsUiProcedureVendorComponent } from './web-procedure-vendor-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureVendorGridComponent } from './web-procedure-vendor-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureVendorComponent, 
        WebProcedureVendorSelectTableViewComponent, 
        WebProcedureVendorSelectComponent,
        WebProcedureVendorGridComponent
    ],
  declarations: [
        WebFormsUiProcedureVendorComponent, 
        WebProcedureVendorSelectTableViewComponent, 
        WebProcedureVendorSelectComponent,
        WebProcedureVendorGridComponent
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
          name: 'procedure-vendor-select',
          component: WebProcedureVendorSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-vendor-grid',
          component: WebProcedureVendorGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureVendorFeatureStore],
})
export class WebFormsUiProcedureVendorSelectModule {}
