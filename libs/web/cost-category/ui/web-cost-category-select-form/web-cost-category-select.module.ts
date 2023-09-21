

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCostCategoryFeatureStore } from '@case-clinical/web/cost-category/shared'
import { WebCostCategorySelectComponent } from './web-cost-category-select.component'
import { WebCostCategorySelectTableViewComponent } from './web-cost-category-select-table-view.component'
import { WebFormsUiCostCategoryComponent } from './web-cost-category-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCostCategoryGridComponent } from './web-cost-category-grid.component'

@NgModule({
  exports: [
        WebFormsUiCostCategoryComponent, 
        WebCostCategorySelectTableViewComponent, 
        WebCostCategorySelectComponent,
        WebCostCategoryGridComponent
    ],
  declarations: [
        WebFormsUiCostCategoryComponent, 
        WebCostCategorySelectTableViewComponent, 
        WebCostCategorySelectComponent,
        WebCostCategoryGridComponent
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
          name: 'cost-category-select',
          component: WebCostCategorySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'cost-category-grid',
          component: WebCostCategoryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCostCategoryFeatureStore],
})
export class WebFormsUiCostCategorySelectModule {}
