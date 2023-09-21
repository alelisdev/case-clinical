

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebContractSelectComponent } from './web-contract-select.component'
import { WebContractSelectTableViewComponent } from './web-contract-select-table-view.component'
import { WebFormsUiContractComponent } from './web-contract-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContractGridComponent } from './web-contract-grid.component'

@NgModule({
  exports: [
        WebFormsUiContractComponent, 
        WebContractSelectTableViewComponent, 
        WebContractSelectComponent,
        WebContractGridComponent
    ],
  declarations: [
        WebFormsUiContractComponent, 
        WebContractSelectTableViewComponent, 
        WebContractSelectComponent,
        WebContractGridComponent
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
          name: 'contract-select',
          component: WebContractSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contract-grid',
          component: WebContractGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContractFeatureStore],
})
export class WebFormsUiContractSelectModule {}
