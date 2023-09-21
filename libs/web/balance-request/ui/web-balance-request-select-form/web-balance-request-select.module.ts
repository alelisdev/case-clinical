

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebBalanceRequestFeatureStore } from '@case-clinical/web/balance-request/shared'
import { WebBalanceRequestSelectComponent } from './web-balance-request-select.component'
import { WebBalanceRequestSelectTableViewComponent } from './web-balance-request-select-table-view.component'
import { WebFormsUiBalanceRequestComponent } from './web-balance-request-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebBalanceRequestGridComponent } from './web-balance-request-grid.component'

@NgModule({
  exports: [
        WebFormsUiBalanceRequestComponent, 
        WebBalanceRequestSelectTableViewComponent, 
        WebBalanceRequestSelectComponent,
        WebBalanceRequestGridComponent
    ],
  declarations: [
        WebFormsUiBalanceRequestComponent, 
        WebBalanceRequestSelectTableViewComponent, 
        WebBalanceRequestSelectComponent,
        WebBalanceRequestGridComponent
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
          name: 'balance-request-select',
          component: WebBalanceRequestSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'balance-request-grid',
          component: WebBalanceRequestGridComponent,
        }
      ],
    }),
  ],
  providers: [WebBalanceRequestFeatureStore],
})
export class WebFormsUiBalanceRequestSelectModule {}
