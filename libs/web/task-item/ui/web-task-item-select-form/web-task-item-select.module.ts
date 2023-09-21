

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTaskItemFeatureStore } from '@case-clinical/web/task-item/shared'
import { WebTaskItemSelectComponent } from './web-task-item-select.component'
import { WebTaskItemSelectTableViewComponent } from './web-task-item-select-table-view.component'
import { WebFormsUiTaskItemComponent } from './web-task-item-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTaskItemGridComponent } from './web-task-item-grid.component'

@NgModule({
  exports: [
        WebFormsUiTaskItemComponent, 
        WebTaskItemSelectTableViewComponent, 
        WebTaskItemSelectComponent,
        WebTaskItemGridComponent
    ],
  declarations: [
        WebFormsUiTaskItemComponent, 
        WebTaskItemSelectTableViewComponent, 
        WebTaskItemSelectComponent,
        WebTaskItemGridComponent
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
          name: 'task-item-select',
          component: WebTaskItemSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'task-item-grid',
          component: WebTaskItemGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTaskItemFeatureStore],
})
export class WebFormsUiTaskItemSelectModule {}
