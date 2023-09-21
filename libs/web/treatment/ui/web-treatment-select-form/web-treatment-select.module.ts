

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTreatmentFeatureStore } from '@case-clinical/web/treatment/shared'
import { WebTreatmentSelectComponent } from './web-treatment-select.component'
import { WebTreatmentSelectTableViewComponent } from './web-treatment-select-table-view.component'
import { WebFormsUiTreatmentComponent } from './web-treatment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTreatmentGridComponent } from './web-treatment-grid.component'

@NgModule({
  exports: [
        WebFormsUiTreatmentComponent, 
        WebTreatmentSelectTableViewComponent, 
        WebTreatmentSelectComponent,
        WebTreatmentGridComponent
    ],
  declarations: [
        WebFormsUiTreatmentComponent, 
        WebTreatmentSelectTableViewComponent, 
        WebTreatmentSelectComponent,
        WebTreatmentGridComponent
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
          name: 'treatment-select',
          component: WebTreatmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'treatment-grid',
          component: WebTreatmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTreatmentFeatureStore],
})
export class WebFormsUiTreatmentSelectModule {}
