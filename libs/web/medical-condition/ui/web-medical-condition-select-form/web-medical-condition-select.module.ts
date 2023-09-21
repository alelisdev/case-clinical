

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebMedicalConditionFeatureStore } from '@case-clinical/web/medical-condition/shared'
import { WebMedicalConditionSelectComponent } from './web-medical-condition-select.component'
import { WebMedicalConditionSelectTableViewComponent } from './web-medical-condition-select-table-view.component'
import { WebFormsUiMedicalConditionComponent } from './web-medical-condition-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebMedicalConditionGridComponent } from './web-medical-condition-grid.component'

@NgModule({
  exports: [
        WebFormsUiMedicalConditionComponent, 
        WebMedicalConditionSelectTableViewComponent, 
        WebMedicalConditionSelectComponent,
        WebMedicalConditionGridComponent
    ],
  declarations: [
        WebFormsUiMedicalConditionComponent, 
        WebMedicalConditionSelectTableViewComponent, 
        WebMedicalConditionSelectComponent,
        WebMedicalConditionGridComponent
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
          name: 'medical-condition-select',
          component: WebMedicalConditionSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'medical-condition-grid',
          component: WebMedicalConditionGridComponent,
        }
      ],
    }),
  ],
  providers: [WebMedicalConditionFeatureStore],
})
export class WebFormsUiMedicalConditionSelectModule {}
