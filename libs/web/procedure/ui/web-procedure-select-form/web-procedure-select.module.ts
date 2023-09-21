

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'
import { WebProcedureSelectComponent } from './web-procedure-select.component'
import { WebProcedureSelectTableViewComponent } from './web-procedure-select-table-view.component'
import { WebFormsUiProcedureComponent } from './web-procedure-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureGridComponent } from './web-procedure-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureComponent, 
        WebProcedureSelectTableViewComponent, 
        WebProcedureSelectComponent,
        WebProcedureGridComponent
    ],
  declarations: [
        WebFormsUiProcedureComponent, 
        WebProcedureSelectTableViewComponent, 
        WebProcedureSelectComponent,
        WebProcedureGridComponent
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
          name: 'procedure-select',
          component: WebProcedureSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-grid',
          component: WebProcedureGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureFeatureStore],
})
export class WebFormsUiProcedureSelectModule {}
