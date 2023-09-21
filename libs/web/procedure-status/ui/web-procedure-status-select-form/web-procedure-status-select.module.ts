

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureStatusFeatureStore } from '@case-clinical/web/procedure-status/shared'
import { WebProcedureStatusSelectComponent } from './web-procedure-status-select.component'
import { WebProcedureStatusSelectTableViewComponent } from './web-procedure-status-select-table-view.component'
import { WebFormsUiProcedureStatusComponent } from './web-procedure-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureStatusGridComponent } from './web-procedure-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureStatusComponent,
        WebProcedureStatusSelectTableViewComponent,
        WebProcedureStatusSelectComponent,
        WebProcedureStatusGridComponent
    ],
  declarations: [
        WebFormsUiProcedureStatusComponent,
        WebProcedureStatusSelectTableViewComponent,
        WebProcedureStatusSelectComponent,
        WebProcedureStatusGridComponent
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
          name: 'procedure-status-select',
          component: WebProcedureStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-status-grid',
          component: WebProcedureStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureStatusFeatureStore],
})
export class WebFormsUiProcedureStatusSelectModule {}
