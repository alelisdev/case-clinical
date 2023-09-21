

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadActionFeatureStore } from '@case-clinical/web/lead-action/shared'
import { WebLeadActionSelectComponent } from './web-lead-action-select.component'
import { WebLeadActionSelectTableViewComponent } from './web-lead-action-select-table-view.component'
import { WebFormsUiLeadActionComponent } from './web-lead-action-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadActionGridComponent } from './web-lead-action-grid.component'

@NgModule({
  exports: [
        WebFormsUiLeadActionComponent, 
        WebLeadActionSelectTableViewComponent, 
        WebLeadActionSelectComponent,
        WebLeadActionGridComponent
    ],
  declarations: [
        WebFormsUiLeadActionComponent, 
        WebLeadActionSelectTableViewComponent, 
        WebLeadActionSelectComponent,
        WebLeadActionGridComponent
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
          name: 'lead-action-select',
          component: WebLeadActionSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-action-grid',
          component: WebLeadActionGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLeadActionFeatureStore],
})
export class WebFormsUiLeadActionSelectModule {}
