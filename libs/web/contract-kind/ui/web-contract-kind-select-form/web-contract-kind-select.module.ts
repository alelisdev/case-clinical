

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContractKindFeatureStore } from '@case-clinical/web/contract-kind/shared'
import { WebContractKindSelectComponent } from './web-contract-kind-select.component'
import { WebContractKindSelectTableViewComponent } from './web-contract-kind-select-table-view.component'
import { WebFormsUiContractKindComponent } from './web-contract-kind-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContractKindGridComponent } from './web-contract-kind-grid.component'

@NgModule({
  exports: [
        WebFormsUiContractKindComponent, 
        WebContractKindSelectTableViewComponent, 
        WebContractKindSelectComponent,
        WebContractKindGridComponent
    ],
  declarations: [
        WebFormsUiContractKindComponent, 
        WebContractKindSelectTableViewComponent, 
        WebContractKindSelectComponent,
        WebContractKindGridComponent
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
          name: 'contract-kind-select',
          component: WebContractKindSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contract-kind-grid',
          component: WebContractKindGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContractKindFeatureStore],
})
export class WebFormsUiContractKindSelectModule {}
