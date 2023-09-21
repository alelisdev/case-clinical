

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebBankFeatureStore } from '@case-clinical/web/bank/shared'
import { WebBankSelectComponent } from './web-bank-select.component'
import { WebBankSelectTableViewComponent } from './web-bank-select-table-view.component'
import { WebFormsUiBankComponent } from './web-bank-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebBankGridComponent } from './web-bank-grid.component'

@NgModule({
  exports: [
        WebFormsUiBankComponent, 
        WebBankSelectTableViewComponent, 
        WebBankSelectComponent,
        WebBankGridComponent
    ],
  declarations: [
        WebFormsUiBankComponent, 
        WebBankSelectTableViewComponent, 
        WebBankSelectComponent,
        WebBankGridComponent
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
          name: 'bank-select',
          component: WebBankSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'bank-grid',
          component: WebBankGridComponent,
        }
      ],
    }),
  ],
  providers: [WebBankFeatureStore],
})
export class WebFormsUiBankSelectModule {}
