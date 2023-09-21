

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import { WebMedicalRecordSelectComponent } from './web-medical-record-select.component'
import { WebMedicalRecordSelectTableViewComponent } from './web-medical-record-select-table-view.component'
import { WebFormsUiMedicalRecordComponent } from './web-medical-record-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebMedicalRecordGridComponent } from './web-medical-record-grid.component'

@NgModule({
  exports: [
        WebFormsUiMedicalRecordComponent, 
        WebMedicalRecordSelectTableViewComponent, 
        WebMedicalRecordSelectComponent,
        WebMedicalRecordGridComponent
    ],
  declarations: [
        WebFormsUiMedicalRecordComponent, 
        WebMedicalRecordSelectTableViewComponent, 
        WebMedicalRecordSelectComponent,
        WebMedicalRecordGridComponent
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
          name: 'medical-record-select',
          component: WebMedicalRecordSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'medical-record-grid',
          component: WebMedicalRecordGridComponent,
        }
      ],
    }),
  ],
  providers: [WebMedicalRecordFeatureStore],
})
export class WebFormsUiMedicalRecordSelectModule {}
