

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInsuranceFeatureStore } from '@case-clinical/web/insurance/shared'
import { WebInsuranceSelectComponent } from './web-insurance-select.component'
import { WebInsuranceSelectTableViewComponent } from './web-insurance-select-table-view.component'
import { WebFormsUiInsuranceComponent } from './web-insurance-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInsuranceGridComponent } from './web-insurance-grid.component'

@NgModule({
  exports: [
        WebFormsUiInsuranceComponent, 
        WebInsuranceSelectTableViewComponent, 
        WebInsuranceSelectComponent,
        WebInsuranceGridComponent
    ],
  declarations: [
        WebFormsUiInsuranceComponent, 
        WebInsuranceSelectTableViewComponent, 
        WebInsuranceSelectComponent,
        WebInsuranceGridComponent
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
          name: 'insurance-select',
          component: WebInsuranceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'insurance-grid',
          component: WebInsuranceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInsuranceFeatureStore],
})
export class WebFormsUiInsuranceSelectModule {}
