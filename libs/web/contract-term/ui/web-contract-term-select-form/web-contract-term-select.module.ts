

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContractTermFeatureStore } from '@case-clinical/web/contract-term/shared'
import { WebContractTermSelectComponent } from './web-contract-term-select.component'
import { WebContractTermSelectTableViewComponent } from './web-contract-term-select-table-view.component'
import { WebFormsUiContractTermComponent } from './web-contract-term-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContractTermGridComponent } from './web-contract-term-grid.component'

@NgModule({
  exports: [
        WebFormsUiContractTermComponent, 
        WebContractTermSelectTableViewComponent, 
        WebContractTermSelectComponent,
        WebContractTermGridComponent
    ],
  declarations: [
        WebFormsUiContractTermComponent, 
        WebContractTermSelectTableViewComponent, 
        WebContractTermSelectComponent,
        WebContractTermGridComponent
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
          name: 'contract-term-select',
          component: WebContractTermSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contract-term-grid',
          component: WebContractTermGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContractTermFeatureStore],
})
export class WebFormsUiContractTermSelectModule {}
