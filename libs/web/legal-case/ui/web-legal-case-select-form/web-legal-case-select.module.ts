

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLegalCaseSelectComponent } from './web-legal-case-select.component'
import { WebLegalCaseSelectTableViewComponent } from './web-legal-case-select-table-view.component'
import { WebFormsUiLegalCaseComponent } from './web-legal-case-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLegalCaseGridComponent } from './web-legal-case-grid.component'

@NgModule({
  exports: [
        WebFormsUiLegalCaseComponent,
        WebLegalCaseSelectTableViewComponent,
        WebLegalCaseSelectComponent,
        WebLegalCaseGridComponent
    ],
  declarations: [
        WebFormsUiLegalCaseComponent,
        WebLegalCaseSelectTableViewComponent,
        WebLegalCaseSelectComponent,
        WebLegalCaseGridComponent
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
          name: 'legal-case-select',
          component: WebLegalCaseSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'legal-case-grid',
          component: WebLegalCaseGridComponent,
        }
      ],
    }),
  ],

})
export class WebFormsUiLegalCaseSelectModule {}
