

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAuthorizationCategoryFeatureStore } from '@case-clinical/web/authorization-category/shared'
import { WebAuthorizationCategorySelectComponent } from './web-authorization-category-select.component'
import { WebAuthorizationCategorySelectTableViewComponent } from './web-authorization-category-select-table-view.component'
import { WebFormsUiAuthorizationCategoryComponent } from './web-authorization-category-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAuthorizationCategoryGridComponent } from './web-authorization-category-grid.component'

@NgModule({
  exports: [
        WebFormsUiAuthorizationCategoryComponent, 
        WebAuthorizationCategorySelectTableViewComponent, 
        WebAuthorizationCategorySelectComponent,
        WebAuthorizationCategoryGridComponent
    ],
  declarations: [
        WebFormsUiAuthorizationCategoryComponent, 
        WebAuthorizationCategorySelectTableViewComponent, 
        WebAuthorizationCategorySelectComponent,
        WebAuthorizationCategoryGridComponent
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
          name: 'authorization-category-select',
          component: WebAuthorizationCategorySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'authorization-category-grid',
          component: WebAuthorizationCategoryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAuthorizationCategoryFeatureStore],
})
export class WebFormsUiAuthorizationCategorySelectModule {}
