

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import { WebInvoiceDetailSelectComponent } from './web-invoice-detail-select.component'
import { WebInvoiceDetailSelectTableViewComponent } from './web-invoice-detail-select-table-view.component'
import { WebFormsUiInvoiceDetailComponent } from './web-invoice-detail-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInvoiceDetailGridComponent } from './web-invoice-detail-grid.component'

@NgModule({
  exports: [
        WebFormsUiInvoiceDetailComponent, 
        WebInvoiceDetailSelectTableViewComponent, 
        WebInvoiceDetailSelectComponent,
        WebInvoiceDetailGridComponent
    ],
  declarations: [
        WebFormsUiInvoiceDetailComponent, 
        WebInvoiceDetailSelectTableViewComponent, 
        WebInvoiceDetailSelectComponent,
        WebInvoiceDetailGridComponent
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
          name: 'invoice-detail-select',
          component: WebInvoiceDetailSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'invoice-detail-grid',
          component: WebInvoiceDetailGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInvoiceDetailFeatureStore],
})
export class WebFormsUiInvoiceDetailSelectModule {}
