

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-authorization/shared'
import { WebProcedureOrTreatmentRequestAuthorizationSelectComponent } from './web-procedure-or-treatment-request-authorization-select.component'
import { WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent } from './web-procedure-or-treatment-request-authorization-select-table-view.component'
import { WebFormsUiProcedureOrTreatmentRequestAuthorizationComponent } from './web-procedure-or-treatment-request-authorization-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureOrTreatmentRequestAuthorizationGridComponent } from './web-procedure-or-treatment-request-authorization-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureOrTreatmentRequestAuthorizationComponent, 
        WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestAuthorizationSelectComponent,
        WebProcedureOrTreatmentRequestAuthorizationGridComponent
    ],
  declarations: [
        WebFormsUiProcedureOrTreatmentRequestAuthorizationComponent, 
        WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent, 
        WebProcedureOrTreatmentRequestAuthorizationSelectComponent,
        WebProcedureOrTreatmentRequestAuthorizationGridComponent
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
          name: 'procedure-or-treatment-request-authorization-select',
          component: WebProcedureOrTreatmentRequestAuthorizationSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-or-treatment-request-authorization-grid',
          component: WebProcedureOrTreatmentRequestAuthorizationGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureOrTreatmentRequestAuthorizationFeatureStore],
})
export class WebFormsUiProcedureOrTreatmentRequestAuthorizationSelectModule {}
