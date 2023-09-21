

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCategoryFeatureStore } from '@case-clinical/web/category/shared'
import { WebCategorySelectComponent } from './web-category-select.component'
import { WebCategorySelectTableViewComponent } from './web-category-select-table-view.component'
import { WebFormsUiCategoryComponent } from './web-category-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCategoryGridComponent } from './web-category-grid.component'

@NgModule({
  exports: [
        WebFormsUiCategoryComponent, 
        WebCategorySelectTableViewComponent, 
        WebCategorySelectComponent,
        WebCategoryGridComponent
    ],
  declarations: [
        WebFormsUiCategoryComponent, 
        WebCategorySelectTableViewComponent, 
        WebCategorySelectComponent,
        WebCategoryGridComponent
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
          name: 'category-select',
          component: WebCategorySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'category-grid',
          component: WebCategoryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCategoryFeatureStore],
})
export class WebFormsUiCategorySelectModule {}
