

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebFeeScheduleFeatureStore } from '@case-clinical/web/fee-schedule/shared'
import { WebFeeScheduleSelectComponent } from './web-fee-schedule-select.component'
import { WebFeeScheduleSelectTableViewComponent } from './web-fee-schedule-select-table-view.component'
import { WebFormsUiFeeScheduleComponent } from './web-fee-schedule-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebFeeScheduleGridComponent } from './web-fee-schedule-grid.component'

@NgModule({
  exports: [
        WebFormsUiFeeScheduleComponent, 
        WebFeeScheduleSelectTableViewComponent, 
        WebFeeScheduleSelectComponent,
        WebFeeScheduleGridComponent
    ],
  declarations: [
        WebFormsUiFeeScheduleComponent, 
        WebFeeScheduleSelectTableViewComponent, 
        WebFeeScheduleSelectComponent,
        WebFeeScheduleGridComponent
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
          name: 'fee-schedule-select',
          component: WebFeeScheduleSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'fee-schedule-grid',
          component: WebFeeScheduleGridComponent,
        }
      ],
    }),
  ],
  providers: [WebFeeScheduleFeatureStore],
})
export class WebFormsUiFeeScheduleSelectModule {}
