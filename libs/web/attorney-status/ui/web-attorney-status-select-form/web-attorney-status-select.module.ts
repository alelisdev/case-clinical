

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAttorneyStatusFeatureStore } from '@case-clinical/web/attorney-status/shared'
import { WebAttorneyStatusSelectComponent } from './web-attorney-status-select.component'
import { WebAttorneyStatusSelectTableViewComponent } from './web-attorney-status-select-table-view.component'
import { WebFormsUiAttorneyStatusComponent } from './web-attorney-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAttorneyStatusGridComponent } from './web-attorney-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiAttorneyStatusComponent, 
        WebAttorneyStatusSelectTableViewComponent, 
        WebAttorneyStatusSelectComponent,
        WebAttorneyStatusGridComponent
    ],
  declarations: [
        WebFormsUiAttorneyStatusComponent, 
        WebAttorneyStatusSelectTableViewComponent, 
        WebAttorneyStatusSelectComponent,
        WebAttorneyStatusGridComponent
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
          name: 'attorney-status-select',
          component: WebAttorneyStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'attorney-status-grid',
          component: WebAttorneyStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAttorneyStatusFeatureStore],
})
export class WebFormsUiAttorneyStatusSelectModule {}
