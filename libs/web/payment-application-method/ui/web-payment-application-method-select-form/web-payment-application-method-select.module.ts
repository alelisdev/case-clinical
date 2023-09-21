

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPaymentApplicationMethodFeatureStore } from '@case-clinical/web/payment-application-method/shared'
import { WebPaymentApplicationMethodSelectComponent } from './web-payment-application-method-select.component'
import { WebPaymentApplicationMethodSelectTableViewComponent } from './web-payment-application-method-select-table-view.component'
import { WebFormsUiPaymentApplicationMethodComponent } from './web-payment-application-method-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPaymentApplicationMethodGridComponent } from './web-payment-application-method-grid.component'

@NgModule({
  exports: [
        WebFormsUiPaymentApplicationMethodComponent, 
        WebPaymentApplicationMethodSelectTableViewComponent, 
        WebPaymentApplicationMethodSelectComponent,
        WebPaymentApplicationMethodGridComponent
    ],
  declarations: [
        WebFormsUiPaymentApplicationMethodComponent, 
        WebPaymentApplicationMethodSelectTableViewComponent, 
        WebPaymentApplicationMethodSelectComponent,
        WebPaymentApplicationMethodGridComponent
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
          name: 'payment-application-method-select',
          component: WebPaymentApplicationMethodSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'payment-application-method-grid',
          component: WebPaymentApplicationMethodGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPaymentApplicationMethodFeatureStore],
})
export class WebFormsUiPaymentApplicationMethodSelectModule {}
