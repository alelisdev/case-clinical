

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAdverseInsuranceStatusFeatureStore } from '@case-clinical/web/adverse-insurance-status/shared'
import { WebAdverseInsuranceStatusSelectComponent } from './web-adverse-insurance-status-select.component'
import { WebAdverseInsuranceStatusSelectTableViewComponent } from './web-adverse-insurance-status-select-table-view.component'
import { WebFormsUiAdverseInsuranceStatusComponent } from './web-adverse-insurance-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAdverseInsuranceStatusGridComponent } from './web-adverse-insurance-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiAdverseInsuranceStatusComponent, 
        WebAdverseInsuranceStatusSelectTableViewComponent, 
        WebAdverseInsuranceStatusSelectComponent,
        WebAdverseInsuranceStatusGridComponent
    ],
  declarations: [
        WebFormsUiAdverseInsuranceStatusComponent, 
        WebAdverseInsuranceStatusSelectTableViewComponent, 
        WebAdverseInsuranceStatusSelectComponent,
        WebAdverseInsuranceStatusGridComponent
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
          name: 'adverse-insurance-status-select',
          component: WebAdverseInsuranceStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'adverse-insurance-status-grid',
          component: WebAdverseInsuranceStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAdverseInsuranceStatusFeatureStore],
})
export class WebFormsUiAdverseInsuranceStatusSelectModule {}
