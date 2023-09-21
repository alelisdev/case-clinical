

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'
import { WebInvoiceSelectComponent } from './web-invoice-select.component'
import { WebInvoiceSelectTableViewComponent } from './web-invoice-select-table-view.component'
import { WebFormsUiInvoiceComponent } from './web-invoice-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInvoiceGridComponent } from './web-invoice-grid.component'

@NgModule({
  exports: [
        WebFormsUiInvoiceComponent, 
        WebInvoiceSelectTableViewComponent, 
        WebInvoiceSelectComponent,
        WebInvoiceGridComponent
    ],
  declarations: [
        WebFormsUiInvoiceComponent, 
        WebInvoiceSelectTableViewComponent, 
        WebInvoiceSelectComponent,
        WebInvoiceGridComponent
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
          name: 'invoice-select',
          component: WebInvoiceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'invoice-grid',
          component: WebInvoiceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInvoiceFeatureStore],
})
export class WebFormsUiInvoiceSelectModule {}
