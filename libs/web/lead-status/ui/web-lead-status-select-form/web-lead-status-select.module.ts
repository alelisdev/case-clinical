

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadStatusFeatureStore } from '@case-clinical/web/lead-status/shared'
import { WebLeadStatusSelectComponent } from './web-lead-status-select.component'
import { WebLeadStatusSelectTableViewComponent } from './web-lead-status-select-table-view.component'
import { WebFormsUiLeadStatusComponent } from './web-lead-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadStatusGridComponent } from './web-lead-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiLeadStatusComponent, 
        WebLeadStatusSelectTableViewComponent, 
        WebLeadStatusSelectComponent,
        WebLeadStatusGridComponent
    ],
  declarations: [
        WebFormsUiLeadStatusComponent, 
        WebLeadStatusSelectTableViewComponent, 
        WebLeadStatusSelectComponent,
        WebLeadStatusGridComponent
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
          name: 'lead-status-select',
          component: WebLeadStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-status-grid',
          component: WebLeadStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLeadStatusFeatureStore],
})
export class WebFormsUiLeadStatusSelectModule {}
