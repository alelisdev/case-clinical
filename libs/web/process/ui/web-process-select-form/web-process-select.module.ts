

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebProcessFeatureStore } from '@case-clinical/web/process/shared'
import { WebProcessSelectComponent } from './web-process-select.component'
import { WebProcessSelectTableViewComponent } from './web-process-select-table-view.component'
import { WebFormsUiProcessComponent } from './web-process-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebProcessGridComponent } from './web-process-grid.component'

@NgModule({
  exports: [
        WebFormsUiProcessComponent, 
        WebProcessSelectTableViewComponent, 
        WebProcessSelectComponent,
        WebProcessGridComponent
    ],
  declarations: [
        WebFormsUiProcessComponent, 
        WebProcessSelectTableViewComponent, 
        WebProcessSelectComponent,
        WebProcessGridComponent
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
          name: 'process-select',
          component: WebProcessSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'process-grid',
          component: WebProcessGridComponent,
        }
      ],
    }),
  ],
  providers: [WebProcessFeatureStore],
})
export class WebFormsUiProcessSelectModule {}
