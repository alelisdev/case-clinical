

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebLeadInjuryFeatureStore } from '@case-clinical/web/lead-injury/shared'
import { WebLeadInjurySelectComponent } from './web-lead-injury-select.component'
import { WebLeadInjurySelectTableViewComponent } from './web-lead-injury-select-table-view.component'
import { WebFormsUiLeadInjuryComponent } from './web-lead-injury-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebLeadInjuryGridComponent } from './web-lead-injury-grid.component'

@NgModule({
  exports: [
        WebFormsUiLeadInjuryComponent, 
        WebLeadInjurySelectTableViewComponent, 
        WebLeadInjurySelectComponent,
        WebLeadInjuryGridComponent
    ],
  declarations: [
        WebFormsUiLeadInjuryComponent, 
        WebLeadInjurySelectTableViewComponent, 
        WebLeadInjurySelectComponent,
        WebLeadInjuryGridComponent
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
          name: 'lead-injury-select',
          component: WebLeadInjurySelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'lead-injury-grid',
          component: WebLeadInjuryGridComponent,
        }
      ],
    }),
  ],
  providers: [WebLeadInjuryFeatureStore],
})
export class WebFormsUiLeadInjurySelectModule {}
