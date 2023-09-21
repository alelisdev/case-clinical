

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared'
import { WebProcedureOrTreatmentRequestSelectComponent } from './web-procedure-or-treatment-request-select.component'
import { WebProcedureOrTreatmentRequestSelectTableViewComponent } from './web-procedure-or-treatment-request-select-table-view.component'
import { WebFormsUiProcedureOrTreatmentRequestComponent } from './web-procedure-or-treatment-request-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureOrTreatmentRequestGridComponent } from './web-procedure-or-treatment-request-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureOrTreatmentRequestComponent, 
        WebProcedureOrTreatmentRequestSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestSelectComponent,
        WebProcedureOrTreatmentRequestGridComponent
    ],
  declarations: [
        WebFormsUiProcedureOrTreatmentRequestComponent, 
        WebProcedureOrTreatmentRequestSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestSelectComponent,
        WebProcedureOrTreatmentRequestGridComponent
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
          name: 'procedure-or-treatment-request-select',
          component: WebProcedureOrTreatmentRequestSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-or-treatment-request-grid',
          component: WebProcedureOrTreatmentRequestGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureOrTreatmentRequestFeatureStore],
})
export class WebFormsUiProcedureOrTreatmentRequestSelectModule {}
