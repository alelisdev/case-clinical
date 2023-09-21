

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPatientStudyFeatureStore } from '@case-clinical/web/patient-study/shared'
import { WebPatientStudySelectComponent } from './web-patient-study-select.component'
import { WebPatientStudySelectTableViewComponent } from './web-patient-study-select-table-view.component'
import { WebFormsUiPatientStudyComponent } from './web-patient-study-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPatientStudyGridComponent } from './web-patient-study-grid.component'

@NgModule({
  exports: [
        WebFormsUiPatientStudyComponent, 
        WebPatientStudySelectTableViewComponent, 
        WebPatientStudySelectComponent,
        WebPatientStudyGridComponent
    ],
  declarations: [
        WebFormsUiPatientStudyComponent, 
        WebPatientStudySelectTableViewComponent, 
        WebPatientStudySelectComponent,
        WebPatientStudyGridComponent
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
          name: 'patient-study-select',
          component: WebPatientStudySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'patient-study-grid',
          component: WebPatientStudyGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPatientStudyFeatureStore],
})
export class WebFormsUiPatientStudySelectModule {}
