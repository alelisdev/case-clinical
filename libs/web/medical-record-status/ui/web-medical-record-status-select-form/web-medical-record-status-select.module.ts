

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebMedicalRecordStatusFeatureStore } from '@case-clinical/web/medical-record-status/shared'
import { WebMedicalRecordStatusSelectComponent } from './web-medical-record-status-select.component'
import { WebMedicalRecordStatusSelectTableViewComponent } from './web-medical-record-status-select-table-view.component'
import { WebFormsUiMedicalRecordStatusComponent } from './web-medical-record-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebMedicalRecordStatusGridComponent } from './web-medical-record-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiMedicalRecordStatusComponent, 
        WebMedicalRecordStatusSelectTableViewComponent, 
        WebMedicalRecordStatusSelectComponent,
        WebMedicalRecordStatusGridComponent
    ],
  declarations: [
        WebFormsUiMedicalRecordStatusComponent, 
        WebMedicalRecordStatusSelectTableViewComponent, 
        WebMedicalRecordStatusSelectComponent,
        WebMedicalRecordStatusGridComponent
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
          name: 'medical-record-status-select',
          component: WebMedicalRecordStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'medical-record-status-grid',
          component: WebMedicalRecordStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebMedicalRecordStatusFeatureStore],
})
export class WebFormsUiMedicalRecordStatusSelectModule {}
