

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebMedicalConditionProviderFeatureStore } from '@case-clinical/web/medical-condition-provider/shared'
import { WebMedicalConditionProviderSelectComponent } from './web-medical-condition-provider-select.component'
import { WebMedicalConditionProviderSelectTableViewComponent } from './web-medical-condition-provider-select-table-view.component'
import { WebFormsUiMedicalConditionProviderComponent } from './web-medical-condition-provider-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebMedicalConditionProviderGridComponent } from './web-medical-condition-provider-grid.component'

@NgModule({
  exports: [
        WebFormsUiMedicalConditionProviderComponent, 
        WebMedicalConditionProviderSelectTableViewComponent, 
        WebMedicalConditionProviderSelectComponent,
        WebMedicalConditionProviderGridComponent
    ],
  declarations: [
        WebFormsUiMedicalConditionProviderComponent, 
        WebMedicalConditionProviderSelectTableViewComponent, 
        WebMedicalConditionProviderSelectComponent,
        WebMedicalConditionProviderGridComponent
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
          name: 'medical-condition-provider-select',
          component: WebMedicalConditionProviderSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'medical-condition-provider-grid',
          component: WebMedicalConditionProviderGridComponent,
        }
      ],
    }),
  ],
  providers: [WebMedicalConditionProviderFeatureStore],
})
export class WebFormsUiMedicalConditionProviderSelectModule {}
