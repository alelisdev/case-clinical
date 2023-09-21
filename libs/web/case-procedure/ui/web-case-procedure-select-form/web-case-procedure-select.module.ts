

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { WebCaseProcedureSelectComponent } from './web-case-procedure-select.component'
import { WebCaseProcedureSelectTableViewComponent } from './web-case-procedure-select-table-view.component'
import { WebFormsUiCaseProcedureComponent } from './web-case-procedure-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebCaseProcedureGridComponent } from './web-case-procedure-grid.component'

@NgModule({
  exports: [
        WebFormsUiCaseProcedureComponent, 
        WebCaseProcedureSelectTableViewComponent, 
        WebCaseProcedureSelectComponent,
        WebCaseProcedureGridComponent
    ],
  declarations: [
        WebFormsUiCaseProcedureComponent, 
        WebCaseProcedureSelectTableViewComponent, 
        WebCaseProcedureSelectComponent,
        WebCaseProcedureGridComponent
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
          name: 'case-procedure-select',
          component: WebCaseProcedureSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'case-procedure-grid',
          component: WebCaseProcedureGridComponent,
        }
      ],
    }),
  ],
  providers: [WebCaseProcedureFeatureStore],
})
export class WebFormsUiCaseProcedureSelectModule {}
