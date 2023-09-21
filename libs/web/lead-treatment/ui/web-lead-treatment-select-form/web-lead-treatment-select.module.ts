

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadTreatmentFeatureStore } from '@case-clinical/web/lead-treatment/shared'
import { WebLeadTreatmentSelectComponent } from './web-lead-treatment-select.component'
import { WebLeadTreatmentSelectTableViewComponent } from './web-lead-treatment-select-table-view.component'
import { WebFormsUiLeadTreatmentComponent } from './web-lead-treatment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadTreatmentGridComponent } from './web-lead-treatment-grid.component'

@NgModule({
  exports: [
        WebFormsUiLeadTreatmentComponent, 
        WebLeadTreatmentSelectTableViewComponent, 
        WebLeadTreatmentSelectComponent,
        WebLeadTreatmentGridComponent
    ],
  declarations: [
        WebFormsUiLeadTreatmentComponent, 
        WebLeadTreatmentSelectTableViewComponent, 
        WebLeadTreatmentSelectComponent,
        WebLeadTreatmentGridComponent
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
          name: 'lead-treatment-select',
          component: WebLeadTreatmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-treatment-grid',
          component: WebLeadTreatmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLeadTreatmentFeatureStore],
})
export class WebFormsUiLeadTreatmentSelectModule {}
