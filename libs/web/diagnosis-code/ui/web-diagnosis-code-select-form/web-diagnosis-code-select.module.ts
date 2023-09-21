

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import { WebDiagnosisCodeSelectComponent } from './web-diagnosis-code-select.component'
import { WebDiagnosisCodeSelectTableViewComponent } from './web-diagnosis-code-select-table-view.component'
import { WebFormsUiDiagnosisCodeComponent } from './web-diagnosis-code-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebDiagnosisCodeGridComponent } from './web-diagnosis-code-grid.component'

@NgModule({
  exports: [
        WebFormsUiDiagnosisCodeComponent, 
        WebDiagnosisCodeSelectTableViewComponent, 
        WebDiagnosisCodeSelectComponent,
        WebDiagnosisCodeGridComponent
    ],
  declarations: [
        WebFormsUiDiagnosisCodeComponent, 
        WebDiagnosisCodeSelectTableViewComponent, 
        WebDiagnosisCodeSelectComponent,
        WebDiagnosisCodeGridComponent
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
          name: 'diagnosis-code-select',
          component: WebDiagnosisCodeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'diagnosis-code-grid',
          component: WebDiagnosisCodeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebDiagnosisCodeFeatureStore],
})
export class WebFormsUiDiagnosisCodeSelectModule {}
