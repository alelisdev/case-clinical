

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebEligibilityStatusFeatureStore } from '@case-clinical/web/eligibility-status/shared'
import { WebEligibilityStatusSelectComponent } from './web-eligibility-status-select.component'
import { WebEligibilityStatusSelectTableViewComponent } from './web-eligibility-status-select-table-view.component'
import { WebFormsUiEligibilityStatusComponent } from './web-eligibility-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebEligibilityStatusGridComponent } from './web-eligibility-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiEligibilityStatusComponent, 
        WebEligibilityStatusSelectTableViewComponent, 
        WebEligibilityStatusSelectComponent,
        WebEligibilityStatusGridComponent
    ],
  declarations: [
        WebFormsUiEligibilityStatusComponent, 
        WebEligibilityStatusSelectTableViewComponent, 
        WebEligibilityStatusSelectComponent,
        WebEligibilityStatusGridComponent
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
          name: 'eligibility-status-select',
          component: WebEligibilityStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'eligibility-status-grid',
          component: WebEligibilityStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebEligibilityStatusFeatureStore],
})
export class WebFormsUiEligibilityStatusSelectModule {}
