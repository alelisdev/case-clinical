

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebHealthInsuranceFeatureStore } from '@case-clinical/web/health-insurance/shared'
import { WebHealthInsuranceSelectComponent } from './web-health-insurance-select.component'
import { WebHealthInsuranceSelectTableViewComponent } from './web-health-insurance-select-table-view.component'
import { WebFormsUiHealthInsuranceComponent } from './web-health-insurance-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebHealthInsuranceGridComponent } from './web-health-insurance-grid.component'

@NgModule({
  exports: [
        WebFormsUiHealthInsuranceComponent, 
        WebHealthInsuranceSelectTableViewComponent, 
        WebHealthInsuranceSelectComponent,
        WebHealthInsuranceGridComponent
    ],
  declarations: [
        WebFormsUiHealthInsuranceComponent, 
        WebHealthInsuranceSelectTableViewComponent, 
        WebHealthInsuranceSelectComponent,
        WebHealthInsuranceGridComponent
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
          name: 'health-insurance-select',
          component: WebHealthInsuranceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'health-insurance-grid',
          component: WebHealthInsuranceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebHealthInsuranceFeatureStore],
})
export class WebFormsUiHealthInsuranceSelectModule {}
