

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebWriteOffStatusFeatureStore } from '@case-clinical/web/write-off-status/shared'
import { WebWriteOffStatusSelectComponent } from './web-write-off-status-select.component'
import { WebWriteOffStatusSelectTableViewComponent } from './web-write-off-status-select-table-view.component'
import { WebFormsUiWriteOffStatusComponent } from './web-write-off-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebWriteOffStatusGridComponent } from './web-write-off-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiWriteOffStatusComponent, 
        WebWriteOffStatusSelectTableViewComponent, 
        WebWriteOffStatusSelectComponent,
        WebWriteOffStatusGridComponent
    ],
  declarations: [
        WebFormsUiWriteOffStatusComponent, 
        WebWriteOffStatusSelectTableViewComponent, 
        WebWriteOffStatusSelectComponent,
        WebWriteOffStatusGridComponent
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
          name: 'write-off-status-select',
          component: WebWriteOffStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'write-off-status-grid',
          component: WebWriteOffStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebWriteOffStatusFeatureStore],
})
export class WebFormsUiWriteOffStatusSelectModule {}
