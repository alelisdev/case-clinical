

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContractedRateFeatureStore } from '@case-clinical/web/contracted-rate/shared'
import { WebContractedRateSelectComponent } from './web-contracted-rate-select.component'
import { WebContractedRateSelectTableViewComponent } from './web-contracted-rate-select-table-view.component'
import { WebFormsUiContractedRateComponent } from './web-contracted-rate-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContractedRateGridComponent } from './web-contracted-rate-grid.component'

@NgModule({
  exports: [
        WebFormsUiContractedRateComponent, 
        WebContractedRateSelectTableViewComponent, 
        WebContractedRateSelectComponent,
        WebContractedRateGridComponent
    ],
  declarations: [
        WebFormsUiContractedRateComponent, 
        WebContractedRateSelectTableViewComponent, 
        WebContractedRateSelectComponent,
        WebContractedRateGridComponent
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
          name: 'contracted-rate-select',
          component: WebContractedRateSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contracted-rate-grid',
          component: WebContractedRateGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContractedRateFeatureStore],
})
export class WebFormsUiContractedRateSelectModule {}
