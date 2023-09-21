

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseTypeFeatureStore } from '@case-clinical/web/case-type/shared'
import { WebCaseTypeSelectComponent } from './web-case-type-select.component'
import { WebCaseTypeSelectTableViewComponent } from './web-case-type-select-table-view.component'
import { WebFormsUiCaseTypeComponent } from './web-case-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseTypeGridComponent } from './web-case-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseTypeComponent, 
        WebCaseTypeSelectTableViewComponent, 
        WebCaseTypeSelectComponent,
        WebCaseTypeGridComponent
    ],
  declarations: [
        WebFormsUiCaseTypeComponent, 
        WebCaseTypeSelectTableViewComponent, 
        WebCaseTypeSelectComponent,
        WebCaseTypeGridComponent
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
          name: 'case-type-select',
          component: WebCaseTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-type-grid',
          component: WebCaseTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseTypeFeatureStore],
})
export class WebFormsUiCaseTypeSelectModule {}
