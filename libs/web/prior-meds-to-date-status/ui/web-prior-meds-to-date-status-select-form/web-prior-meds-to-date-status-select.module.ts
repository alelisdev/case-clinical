

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { WebPriorMedsToDateStatusSelectComponent } from './web-prior-meds-to-date-status-select.component'
import { WebPriorMedsToDateStatusSelectTableViewComponent } from './web-prior-meds-to-date-status-select-table-view.component'
import { WebFormsUiPriorMedsToDateStatusComponent } from './web-prior-meds-to-date-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebPriorMedsToDateStatusGridComponent } from './web-prior-meds-to-date-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiPriorMedsToDateStatusComponent, 
        WebPriorMedsToDateStatusSelectTableViewComponent, 
        WebPriorMedsToDateStatusSelectComponent,
        WebPriorMedsToDateStatusGridComponent
    ],
  declarations: [
        WebFormsUiPriorMedsToDateStatusComponent, 
        WebPriorMedsToDateStatusSelectTableViewComponent, 
        WebPriorMedsToDateStatusSelectComponent,
        WebPriorMedsToDateStatusGridComponent
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
          name: 'prior-meds-to-date-status-select',
          component: WebPriorMedsToDateStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'prior-meds-to-date-status-grid',
          component: WebPriorMedsToDateStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebPriorMedsToDateStatusFeatureStore],
})
export class WebFormsUiPriorMedsToDateStatusSelectModule {}
