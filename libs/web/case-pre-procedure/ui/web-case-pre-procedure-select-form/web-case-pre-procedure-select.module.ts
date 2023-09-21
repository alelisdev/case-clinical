

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCasePreProcedureFeatureStore } from '@case-clinical/web/case-pre-procedure/shared'
import { WebCasePreProcedureSelectComponent } from './web-case-pre-procedure-select.component'
import { WebCasePreProcedureSelectTableViewComponent } from './web-case-pre-procedure-select-table-view.component'
import { WebFormsUiCasePreProcedureComponent } from './web-case-pre-procedure-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCasePreProcedureGridComponent } from './web-case-pre-procedure-grid.component'

@NgModule({
  exports: [
        WebFormsUiCasePreProcedureComponent, 
        WebCasePreProcedureSelectTableViewComponent, 
        WebCasePreProcedureSelectComponent,
        WebCasePreProcedureGridComponent
    ],
  declarations: [
        WebFormsUiCasePreProcedureComponent, 
        WebCasePreProcedureSelectTableViewComponent, 
        WebCasePreProcedureSelectComponent,
        WebCasePreProcedureGridComponent
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
          name: 'case-pre-procedure-select',
          component: WebCasePreProcedureSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-pre-procedure-grid',
          component: WebCasePreProcedureGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCasePreProcedureFeatureStore],
})
export class WebFormsUiCasePreProcedureSelectModule {}
