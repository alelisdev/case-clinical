

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebLeadSelectComponent } from './web-lead-select.component'
import { WebLeadSelectTableViewComponent } from './web-lead-select-table-view.component'
import { WebFormsUiLeadComponent } from './web-lead-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadGridComponent } from './web-lead-grid.component'
import { WebLeadFormComponent } from './web-lead-form.component'

@NgModule({
  exports: [
        WebFormsUiLeadComponent, 
        WebLeadSelectTableViewComponent, 
        WebLeadSelectComponent,
        WebLeadGridComponent
    ],
  declarations: [
        WebFormsUiLeadComponent, 
        WebLeadSelectTableViewComponent, 
        WebLeadSelectComponent,
        WebLeadGridComponent,
        WebLeadFormComponent,
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
          name: 'lead-select',
          component: WebLeadSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-grid',
          component: WebLeadGridComponent,
        },
        {
          name: 'lead-form',
          component: WebLeadFormComponent,
        },
      ],
    }),
  ],
  providers: [WebLeadFeatureStore],
})
export class WebFormsUiLeadSelectModule {}
