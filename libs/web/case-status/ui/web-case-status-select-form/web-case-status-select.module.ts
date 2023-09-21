

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { WebCaseStatusSelectComponent } from './web-case-status-select.component'
import { WebCaseStatusSelectTableViewComponent } from './web-case-status-select-table-view.component'
import { WebFormsUiCaseStatusComponent } from './web-case-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseStatusGridComponent } from './web-case-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseStatusComponent, 
        WebCaseStatusSelectTableViewComponent, 
        WebCaseStatusSelectComponent,
        WebCaseStatusGridComponent
    ],
  declarations: [
        WebFormsUiCaseStatusComponent, 
        WebCaseStatusSelectTableViewComponent, 
        WebCaseStatusSelectComponent,
        WebCaseStatusGridComponent
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
          name: 'case-status-select',
          component: WebCaseStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-status-grid',
          component: WebCaseStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseStatusFeatureStore],
})
export class WebFormsUiCaseStatusSelectModule {}
