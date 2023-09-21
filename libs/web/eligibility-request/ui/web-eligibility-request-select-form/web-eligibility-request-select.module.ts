

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebEligibilityRequestFeatureStore } from '@case-clinical/web/eligibility-request/shared'
import { WebEligibilityRequestSelectComponent } from './web-eligibility-request-select.component'
import { WebEligibilityRequestSelectTableViewComponent } from './web-eligibility-request-select-table-view.component'
import { WebFormsUiEligibilityRequestComponent } from './web-eligibility-request-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebEligibilityRequestGridComponent } from './web-eligibility-request-grid.component'

@NgModule({
  exports: [
        WebFormsUiEligibilityRequestComponent, 
        WebEligibilityRequestSelectTableViewComponent, 
        WebEligibilityRequestSelectComponent,
        WebEligibilityRequestGridComponent
    ],
  declarations: [
        WebFormsUiEligibilityRequestComponent, 
        WebEligibilityRequestSelectTableViewComponent, 
        WebEligibilityRequestSelectComponent,
        WebEligibilityRequestGridComponent
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
          name: 'eligibility-request-select',
          component: WebEligibilityRequestSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'eligibility-request-grid',
          component: WebEligibilityRequestGridComponent,
        }
      ],
    }),
  ],
  providers: [WebEligibilityRequestFeatureStore],
})
export class WebFormsUiEligibilityRequestSelectModule {}
