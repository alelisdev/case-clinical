

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebWriteOffFeatureStore } from '@case-clinical/web/write-off/shared'
import { WebWriteOffSelectComponent } from './web-write-off-select.component'
import { WebWriteOffSelectTableViewComponent } from './web-write-off-select-table-view.component'
import { WebFormsUiWriteOffComponent } from './web-write-off-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebWriteOffGridComponent } from './web-write-off-grid.component'

@NgModule({
  exports: [
        WebFormsUiWriteOffComponent, 
        WebWriteOffSelectTableViewComponent, 
        WebWriteOffSelectComponent,
        WebWriteOffGridComponent
    ],
  declarations: [
        WebFormsUiWriteOffComponent, 
        WebWriteOffSelectTableViewComponent, 
        WebWriteOffSelectComponent,
        WebWriteOffGridComponent
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
          name: 'write-off-select',
          component: WebWriteOffSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'write-off-grid',
          component: WebWriteOffGridComponent,
        }
      ],
    }),
  ],
  providers: [WebWriteOffFeatureStore],
})
export class WebFormsUiWriteOffSelectModule {}
