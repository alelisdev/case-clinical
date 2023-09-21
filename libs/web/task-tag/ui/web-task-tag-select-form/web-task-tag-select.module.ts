

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebTaskTagFeatureStore } from '@case-clinical/web/task-tag/shared'
import { WebTaskTagSelectComponent } from './web-task-tag-select.component'
import { WebTaskTagSelectTableViewComponent } from './web-task-tag-select-table-view.component'
import { WebFormsUiTaskTagComponent } from './web-task-tag-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebTaskTagGridComponent } from './web-task-tag-grid.component'

@NgModule({
  exports: [
        WebFormsUiTaskTagComponent, 
        WebTaskTagSelectTableViewComponent, 
        WebTaskTagSelectComponent,
        WebTaskTagGridComponent
    ],
  declarations: [
        WebFormsUiTaskTagComponent, 
        WebTaskTagSelectTableViewComponent, 
        WebTaskTagSelectComponent,
        WebTaskTagGridComponent
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
          name: 'task-tag-select',
          component: WebTaskTagSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'task-tag-grid',
          component: WebTaskTagGridComponent,
        }
      ],
    }),
  ],
  providers: [WebTaskTagFeatureStore],
})
export class WebFormsUiTaskTagSelectModule {}
