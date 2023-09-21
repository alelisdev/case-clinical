

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseProgressStatusFeatureStore } from '@case-clinical/web/case-progress-status/shared'
import { WebCaseProgressStatusSelectComponent } from './web-case-progress-status-select.component'
import { WebCaseProgressStatusSelectTableViewComponent } from './web-case-progress-status-select-table-view.component'
import { WebFormsUiCaseProgressStatusComponent } from './web-case-progress-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseProgressStatusGridComponent } from './web-case-progress-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseProgressStatusComponent, 
        WebCaseProgressStatusSelectTableViewComponent, 
        WebCaseProgressStatusSelectComponent,
        WebCaseProgressStatusGridComponent
    ],
  declarations: [
        WebFormsUiCaseProgressStatusComponent, 
        WebCaseProgressStatusSelectTableViewComponent, 
        WebCaseProgressStatusSelectComponent,
        WebCaseProgressStatusGridComponent
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
          name: 'case-progress-status-select',
          component: WebCaseProgressStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-progress-status-grid',
          component: WebCaseProgressStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseProgressStatusFeatureStore],
})
export class WebFormsUiCaseProgressStatusSelectModule {}
