

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPaymentTypeFeatureStore } from '@case-clinical/web/payment-type/shared'
import { WebPaymentTypeSelectComponent } from './web-payment-type-select.component'
import { WebPaymentTypeSelectTableViewComponent } from './web-payment-type-select-table-view.component'
import { WebFormsUiPaymentTypeComponent } from './web-payment-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPaymentTypeGridComponent } from './web-payment-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiPaymentTypeComponent, 
        WebPaymentTypeSelectTableViewComponent, 
        WebPaymentTypeSelectComponent,
        WebPaymentTypeGridComponent
    ],
  declarations: [
        WebFormsUiPaymentTypeComponent, 
        WebPaymentTypeSelectTableViewComponent, 
        WebPaymentTypeSelectComponent,
        WebPaymentTypeGridComponent
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
          name: 'payment-type-select',
          component: WebPaymentTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'payment-type-grid',
          component: WebPaymentTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPaymentTypeFeatureStore],
})
export class WebFormsUiPaymentTypeSelectModule {}
