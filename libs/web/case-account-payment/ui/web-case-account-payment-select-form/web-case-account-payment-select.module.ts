

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseAccountPaymentFeatureStore } from '@case-clinical/web/case-account-payment/shared'
import { WebCaseAccountPaymentSelectComponent } from './web-case-account-payment-select.component'
import { WebCaseAccountPaymentSelectTableViewComponent } from './web-case-account-payment-select-table-view.component'
import { WebFormsUiCaseAccountPaymentComponent } from './web-case-account-payment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseAccountPaymentGridComponent } from './web-case-account-payment-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseAccountPaymentComponent, 
        WebCaseAccountPaymentSelectTableViewComponent, 
        WebCaseAccountPaymentSelectComponent,
        WebCaseAccountPaymentGridComponent
    ],
  declarations: [
        WebFormsUiCaseAccountPaymentComponent, 
        WebCaseAccountPaymentSelectTableViewComponent, 
        WebCaseAccountPaymentSelectComponent,
        WebCaseAccountPaymentGridComponent
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
          name: 'case-account-payment-select',
          component: WebCaseAccountPaymentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-account-payment-grid',
          component: WebCaseAccountPaymentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseAccountPaymentFeatureStore],
})
export class WebFormsUiCaseAccountPaymentSelectModule {}
