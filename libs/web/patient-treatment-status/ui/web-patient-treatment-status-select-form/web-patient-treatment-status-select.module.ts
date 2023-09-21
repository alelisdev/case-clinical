

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
import { WebPatientTreatmentStatusSelectComponent } from './web-patient-treatment-status-select.component'
import { WebPatientTreatmentStatusSelectTableViewComponent } from './web-patient-treatment-status-select-table-view.component'
import { WebFormsUiPatientTreatmentStatusComponent } from './web-patient-treatment-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPatientTreatmentStatusGridComponent } from './web-patient-treatment-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiPatientTreatmentStatusComponent, 
        WebPatientTreatmentStatusSelectTableViewComponent, 
        WebPatientTreatmentStatusSelectComponent,
        WebPatientTreatmentStatusGridComponent
    ],
  declarations: [
        WebFormsUiPatientTreatmentStatusComponent, 
        WebPatientTreatmentStatusSelectTableViewComponent, 
        WebPatientTreatmentStatusSelectComponent,
        WebPatientTreatmentStatusGridComponent
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
          name: 'patient-treatment-status-select',
          component: WebPatientTreatmentStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'patient-treatment-status-grid',
          component: WebPatientTreatmentStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPatientTreatmentStatusFeatureStore],
})
export class WebFormsUiPatientTreatmentStatusSelectModule {}
