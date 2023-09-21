

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadSourceFeatureStore } from '@case-clinical/web/lead-source/shared'
import { WebLeadSourceSelectComponent } from './web-lead-source-select.component'
import { WebLeadSourceSelectTableViewComponent } from './web-lead-source-select-table-view.component'
import { WebFormsUiLeadSourceComponent } from './web-lead-source-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadSourceGridComponent } from './web-lead-source-grid.component'

@NgModule({
  exports: [
        WebFormsUiLeadSourceComponent, 
        WebLeadSourceSelectTableViewComponent, 
        WebLeadSourceSelectComponent,
        WebLeadSourceGridComponent
    ],
  declarations: [
        WebFormsUiLeadSourceComponent, 
        WebLeadSourceSelectTableViewComponent, 
        WebLeadSourceSelectComponent,
        WebLeadSourceGridComponent
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
          name: 'lead-source-select',
          component: WebLeadSourceSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-source-grid',
          component: WebLeadSourceGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLeadSourceFeatureStore],
})
export class WebFormsUiLeadSourceSelectModule {}
