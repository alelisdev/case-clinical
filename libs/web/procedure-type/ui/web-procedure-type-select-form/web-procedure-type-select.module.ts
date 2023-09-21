

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
import { WebProcedureTypeSelectComponent } from './web-procedure-type-select.component'
import { WebProcedureTypeSelectTableViewComponent } from './web-procedure-type-select-table-view.component'
import { WebFormsUiProcedureTypeComponent } from './web-procedure-type-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcedureTypeGridComponent } from './web-procedure-type-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcedureTypeComponent, 
        WebProcedureTypeSelectTableViewComponent, 
        WebProcedureTypeSelectComponent,
        WebProcedureTypeGridComponent
    ],
  declarations: [
        WebFormsUiProcedureTypeComponent, 
        WebProcedureTypeSelectTableViewComponent, 
        WebProcedureTypeSelectComponent,
        WebProcedureTypeGridComponent
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
          name: 'procedure-type-select',
          component: WebProcedureTypeSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'procedure-type-grid',
          component: WebProcedureTypeGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcedureTypeFeatureStore],
})
export class WebFormsUiProcedureTypeSelectModule {}
