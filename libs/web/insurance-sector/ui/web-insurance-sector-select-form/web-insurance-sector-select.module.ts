

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebInsuranceSectorFeatureStore } from '@case-clinical/web/insurance-sector/shared'
import { WebInsuranceSectorSelectComponent } from './web-insurance-sector-select.component'
import { WebInsuranceSectorSelectTableViewComponent } from './web-insurance-sector-select-table-view.component'
import { WebFormsUiInsuranceSectorComponent } from './web-insurance-sector-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebInsuranceSectorGridComponent } from './web-insurance-sector-grid.component'

@NgModule({
  exports: [
        WebFormsUiInsuranceSectorComponent, 
        WebInsuranceSectorSelectTableViewComponent, 
        WebInsuranceSectorSelectComponent,
        WebInsuranceSectorGridComponent
    ],
  declarations: [
        WebFormsUiInsuranceSectorComponent, 
        WebInsuranceSectorSelectTableViewComponent, 
        WebInsuranceSectorSelectComponent,
        WebInsuranceSectorGridComponent
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
          name: 'insurance-sector-select',
          component: WebInsuranceSectorSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'insurance-sector-grid',
          component: WebInsuranceSectorGridComponent,
        }
      ],
    }),
  ],
  providers: [WebInsuranceSectorFeatureStore],
})
export class WebFormsUiInsuranceSectorSelectModule {}
