

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/authorization-diagnosis-code/shared'
import { WebAuthorizationDiagnosisCodeSelectComponent } from './web-authorization-diagnosis-code-select.component'
import { WebAuthorizationDiagnosisCodeSelectTableViewComponent } from './web-authorization-diagnosis-code-select-table-view.component'
import { WebFormsUiAuthorizationDiagnosisCodeComponent } from './web-authorization-diagnosis-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationDiagnosisCodeGridComponent } from './web-authorization-diagnosis-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationDiagnosisCodeComponent, 
        WebAuthorizationDiagnosisCodeSelectTableViewComponent, 
        WebAuthorizationDiagnosisCodeSelectComponent,
        WebAuthorizationDiagnosisCodeGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationDiagnosisCodeComponent, 
        WebAuthorizationDiagnosisCodeSelectTableViewComponent, 
        WebAuthorizationDiagnosisCodeSelectComponent,
        WebAuthorizationDiagnosisCodeGridComponent
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
          name: 'authorization-diagnosis-code-select',
          component: WebAuthorizationDiagnosisCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-diagnosis-code-grid',
          component: WebAuthorizationDiagnosisCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationDiagnosisCodeFeatureStore],
})
export class WebFormsUiAuthorizationDiagnosisCodeSelectModule {}
