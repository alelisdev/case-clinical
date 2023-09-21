

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/shared'
import { WebProcedureOrTreatmentRequestDiagnosisCodeSelectComponent } from './web-procedure-or-treatment-request-diagnosis-code-select.component'
import { WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent } from './web-procedure-or-treatment-request-diagnosis-code-select-table-view.component'
import { WebFormsUiProcedureOrTreatmentRequestDiagnosisCodeComponent } from './web-procedure-or-treatment-request-diagnosis-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureOrTreatmentRequestDiagnosisCodeGridComponent } from './web-procedure-or-treatment-request-diagnosis-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureOrTreatmentRequestDiagnosisCodeComponent, 
        WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestDiagnosisCodeSelectComponent,
        WebProcedureOrTreatmentRequestDiagnosisCodeGridComponent
    ],
  declarations: [
        WebFormsUiProcedureOrTreatmentRequestDiagnosisCodeComponent, 
        WebProcedureOrTreatmentRequestDiagnosisCodeSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestDiagnosisCodeSelectComponent,
        WebProcedureOrTreatmentRequestDiagnosisCodeGridComponent
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
          name: 'procedure-or-treatment-request-diagnosis-code-select',
          component: WebProcedureOrTreatmentRequestDiagnosisCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-or-treatment-request-diagnosis-code-grid',
          component: WebProcedureOrTreatmentRequestDiagnosisCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore],
})
export class WebFormsUiProcedureOrTreatmentRequestDiagnosisCodeSelectModule {}
