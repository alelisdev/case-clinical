

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCalculationBasisTypeFeatureStore } from '@case-clinical/web/calculation-basis-type/shared'
import { WebCalculationBasisTypeSelectComponent } from './web-calculation-basis-type-select.component'
import { WebCalculationBasisTypeSelectTableViewComponent } from './web-calculation-basis-type-select-table-view.component'
import { WebFormsUiCalculationBasisTypeComponent } from './web-calculation-basis-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCalculationBasisTypeGridComponent } from './web-calculation-basis-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiCalculationBasisTypeComponent, 
        WebCalculationBasisTypeSelectTableViewComponent, 
        WebCalculationBasisTypeSelectComponent,
        WebCalculationBasisTypeGridComponent
    ],
  declarations: [
        WebFormsUiCalculationBasisTypeComponent, 
        WebCalculationBasisTypeSelectTableViewComponent, 
        WebCalculationBasisTypeSelectComponent,
        WebCalculationBasisTypeGridComponent
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
          name: 'calculation-basis-type-select',
          component: WebCalculationBasisTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'calculation-basis-type-grid',
          component: WebCalculationBasisTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCalculationBasisTypeFeatureStore],
})
export class WebFormsUiCalculationBasisTypeSelectModule {}
