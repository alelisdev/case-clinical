

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPayorTypeFeatureStore } from '@case-clinical/web/payor-type/shared'
import { WebPayorTypeSelectComponent } from './web-payor-type-select.component'
import { WebPayorTypeSelectTableViewComponent } from './web-payor-type-select-table-view.component'
import { WebFormsUiPayorTypeComponent } from './web-payor-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPayorTypeGridComponent } from './web-payor-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiPayorTypeComponent, 
        WebPayorTypeSelectTableViewComponent, 
        WebPayorTypeSelectComponent,
        WebPayorTypeGridComponent
    ],
  declarations: [
        WebFormsUiPayorTypeComponent, 
        WebPayorTypeSelectTableViewComponent, 
        WebPayorTypeSelectComponent,
        WebPayorTypeGridComponent
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
          name: 'payor-type-select',
          component: WebPayorTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'payor-type-grid',
          component: WebPayorTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPayorTypeFeatureStore],
})
export class WebFormsUiPayorTypeSelectModule {}
