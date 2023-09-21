

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebContractedRateKindFeatureStore } from '@case-clinical/web/contracted-rate-kind/shared'
import { WebContractedRateKindSelectComponent } from './web-contracted-rate-kind-select.component'
import { WebContractedRateKindSelectTableViewComponent } from './web-contracted-rate-kind-select-table-view.component'
import { WebFormsUiContractedRateKindComponent } from './web-contracted-rate-kind-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebContractedRateKindGridComponent } from './web-contracted-rate-kind-grid.component'

@NgModule({
  exports: [
        WebFormsUiContractedRateKindComponent, 
        WebContractedRateKindSelectTableViewComponent, 
        WebContractedRateKindSelectComponent,
        WebContractedRateKindGridComponent
    ],
  declarations: [
        WebFormsUiContractedRateKindComponent, 
        WebContractedRateKindSelectTableViewComponent, 
        WebContractedRateKindSelectComponent,
        WebContractedRateKindGridComponent
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
          name: 'contracted-rate-kind-select',
          component: WebContractedRateKindSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'contracted-rate-kind-grid',
          component: WebContractedRateKindGridComponent,
        }
      ],
    }),
  ],
  providers: [WebContractedRateKindFeatureStore],
})
export class WebFormsUiContractedRateKindSelectModule {}
