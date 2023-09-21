

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebPatientSelectComponent } from './web-patient-select.component'
import { WebPatientSelectTableViewComponent } from './web-patient-select-table-view.component'
import { WebFormsUiPatientComponent } from './web-patient-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPatientGridComponent } from './web-patient-grid.component'

@NgModule({
  exports: [
        WebFormsUiPatientComponent, 
        WebPatientSelectTableViewComponent, 
        WebPatientSelectComponent,
        WebPatientGridComponent
    ],
  declarations: [
        WebFormsUiPatientComponent, 
        WebPatientSelectTableViewComponent, 
        WebPatientSelectComponent,
        WebPatientGridComponent
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
          name: 'patient-select',
          component: WebPatientSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'patient-grid',
          component: WebPatientGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPatientFeatureStore],
})
export class WebFormsUiPatientSelectModule {}
