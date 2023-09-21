

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInsuranceTypeFeatureStore } from '@case-clinical/web/insurance-type/shared'
import { WebInsuranceTypeSelectComponent } from './web-insurance-type-select.component'
import { WebInsuranceTypeSelectTableViewComponent } from './web-insurance-type-select-table-view.component'
import { WebFormsUiInsuranceTypeComponent } from './web-insurance-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInsuranceTypeGridComponent } from './web-insurance-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiInsuranceTypeComponent, 
        WebInsuranceTypeSelectTableViewComponent, 
        WebInsuranceTypeSelectComponent,
        WebInsuranceTypeGridComponent
    ],
  declarations: [
        WebFormsUiInsuranceTypeComponent, 
        WebInsuranceTypeSelectTableViewComponent, 
        WebInsuranceTypeSelectComponent,
        WebInsuranceTypeGridComponent
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
          name: 'insurance-type-select',
          component: WebInsuranceTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'insurance-type-grid',
          component: WebInsuranceTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInsuranceTypeFeatureStore],
})
export class WebFormsUiInsuranceTypeSelectModule {}
