

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebFacilityFeeScheduleFeatureStore } from '@case-clinical/web/facility-fee-schedule/shared'
import { WebFacilityFeeScheduleSelectComponent } from './web-facility-fee-schedule-select.component'
import { WebFacilityFeeScheduleSelectTableViewComponent } from './web-facility-fee-schedule-select-table-view.component'
import { WebFormsUiFacilityFeeScheduleComponent } from './web-facility-fee-schedule-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebFacilityFeeScheduleGridComponent } from './web-facility-fee-schedule-grid.component'

@NgModule({
  exports: [
        WebFormsUiFacilityFeeScheduleComponent, 
        WebFacilityFeeScheduleSelectTableViewComponent, 
        WebFacilityFeeScheduleSelectComponent,
        WebFacilityFeeScheduleGridComponent
    ],
  declarations: [
        WebFormsUiFacilityFeeScheduleComponent, 
        WebFacilityFeeScheduleSelectTableViewComponent, 
        WebFacilityFeeScheduleSelectComponent,
        WebFacilityFeeScheduleGridComponent
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
          name: 'facility-fee-schedule-select',
          component: WebFacilityFeeScheduleSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'facility-fee-schedule-grid',
          component: WebFacilityFeeScheduleGridComponent,
        }
      ],
    }),
  ],
  providers: [WebFacilityFeeScheduleFeatureStore],
})
export class WebFormsUiFacilityFeeScheduleSelectModule {}
