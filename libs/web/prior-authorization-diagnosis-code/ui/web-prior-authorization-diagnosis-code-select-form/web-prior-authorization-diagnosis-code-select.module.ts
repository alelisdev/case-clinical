

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'
import { WebPriorAuthorizationDiagnosisCodeSelectComponent } from './web-prior-authorization-diagnosis-code-select.component'
import { WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent } from './web-prior-authorization-diagnosis-code-select-table-view.component'
import { WebFormsUiPriorAuthorizationDiagnosisCodeComponent } from './web-prior-authorization-diagnosis-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorAuthorizationDiagnosisCodeGridComponent } from './web-prior-authorization-diagnosis-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorAuthorizationDiagnosisCodeComponent, 
        WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent, 
        WebPriorAuthorizationDiagnosisCodeSelectComponent,
        WebPriorAuthorizationDiagnosisCodeGridComponent
    ],
  declarations: [
        WebFormsUiPriorAuthorizationDiagnosisCodeComponent, 
        WebPriorAuthorizationDiagnosisCodeSelectTableViewComponent, 
        WebPriorAuthorizationDiagnosisCodeSelectComponent,
        WebPriorAuthorizationDiagnosisCodeGridComponent
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
          name: 'prior-authorization-diagnosis-code-select',
          component: WebPriorAuthorizationDiagnosisCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-authorization-diagnosis-code-grid',
          component: WebPriorAuthorizationDiagnosisCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorAuthorizationDiagnosisCodeFeatureStore],
})
export class WebFormsUiPriorAuthorizationDiagnosisCodeSelectModule {}
