

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebFirmStatusFeatureStore } from '@case-clinical/web/firm-status/shared'
import { WebFirmStatusSelectComponent } from './web-firm-status-select.component'
import { WebFirmStatusSelectTableViewComponent } from './web-firm-status-select-table-view.component'
import { WebFormsUiFirmStatusComponent } from './web-firm-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebFirmStatusGridComponent } from './web-firm-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiFirmStatusComponent, 
        WebFirmStatusSelectTableViewComponent, 
        WebFirmStatusSelectComponent,
        WebFirmStatusGridComponent
    ],
  declarations: [
        WebFormsUiFirmStatusComponent, 
        WebFirmStatusSelectTableViewComponent, 
        WebFirmStatusSelectComponent,
        WebFirmStatusGridComponent
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
          name: 'firm-status-select',
          component: WebFirmStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'firm-status-grid',
          component: WebFirmStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebFirmStatusFeatureStore],
})
export class WebFormsUiFirmStatusSelectModule {}
