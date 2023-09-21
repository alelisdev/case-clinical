

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebImplantCategoryFeatureStore } from '@case-clinical/web/implant-category/shared'
import { WebImplantCategorySelectComponent } from './web-implant-category-select.component'
import { WebImplantCategorySelectTableViewComponent } from './web-implant-category-select-table-view.component'
import { WebFormsUiImplantCategoryComponent } from './web-implant-category-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebImplantCategoryGridComponent } from './web-implant-category-grid.component'

@NgModule({
  exports: [
        WebFormsUiImplantCategoryComponent, 
        WebImplantCategorySelectTableViewComponent, 
        WebImplantCategorySelectComponent,
        WebImplantCategoryGridComponent
    ],
  declarations: [
        WebFormsUiImplantCategoryComponent, 
        WebImplantCategorySelectTableViewComponent, 
        WebImplantCategorySelectComponent,
        WebImplantCategoryGridComponent
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
          name: 'implant-category-select',
          component: WebImplantCategorySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'implant-category-grid',
          component: WebImplantCategoryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebImplantCategoryFeatureStore],
})
export class WebFormsUiImplantCategorySelectModule {}
