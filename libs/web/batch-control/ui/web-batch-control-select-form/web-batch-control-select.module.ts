

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebBatchControlFeatureStore } from '@case-clinical/web/batch-control/shared'
import { WebBatchControlSelectComponent } from './web-batch-control-select.component'
import { WebBatchControlSelectTableViewComponent } from './web-batch-control-select-table-view.component'
import { WebFormsUiBatchControlComponent } from './web-batch-control-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebBatchControlGridComponent } from './web-batch-control-grid.component'

@NgModule({
  exports: [
        WebFormsUiBatchControlComponent, 
        WebBatchControlSelectTableViewComponent, 
        WebBatchControlSelectComponent,
        WebBatchControlGridComponent
    ],
  declarations: [
        WebFormsUiBatchControlComponent, 
        WebBatchControlSelectTableViewComponent, 
        WebBatchControlSelectComponent,
        WebBatchControlGridComponent
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
          name: 'batch-control-select',
          component: WebBatchControlSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'batch-control-grid',
          component: WebBatchControlGridComponent,
        }
      ],
    }),
  ],
  providers: [WebBatchControlFeatureStore],
})
export class WebFormsUiBatchControlSelectModule {}
