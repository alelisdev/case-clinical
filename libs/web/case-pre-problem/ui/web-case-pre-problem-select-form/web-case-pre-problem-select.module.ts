

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCasePreProblemFeatureStore } from '@case-clinical/web/case-pre-problem/shared'
import { WebCasePreProblemSelectComponent } from './web-case-pre-problem-select.component'
import { WebCasePreProblemSelectTableViewComponent } from './web-case-pre-problem-select-table-view.component'
import { WebFormsUiCasePreProblemComponent } from './web-case-pre-problem-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCasePreProblemGridComponent } from './web-case-pre-problem-grid.component'

@NgModule({
  exports: [
        WebFormsUiCasePreProblemComponent, 
        WebCasePreProblemSelectTableViewComponent, 
        WebCasePreProblemSelectComponent,
        WebCasePreProblemGridComponent
    ],
  declarations: [
        WebFormsUiCasePreProblemComponent, 
        WebCasePreProblemSelectTableViewComponent, 
        WebCasePreProblemSelectComponent,
        WebCasePreProblemGridComponent
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
          name: 'case-pre-problem-select',
          component: WebCasePreProblemSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-pre-problem-grid',
          component: WebCasePreProblemGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCasePreProblemFeatureStore],
})
export class WebFormsUiCasePreProblemSelectModule {}
