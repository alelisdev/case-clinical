

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
import { WebAppointmentStatusSelectComponent } from './web-appointment-status-select.component'
import { WebAppointmentStatusSelectTableViewComponent } from './web-appointment-status-select-table-view.component'
import { WebFormsUiAppointmentStatusComponent } from './web-appointment-status-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAppointmentStatusGridComponent } from './web-appointment-status-grid.component'

@NgModule({
  exports: [
        WebFormsUiAppointmentStatusComponent, 
        WebAppointmentStatusSelectTableViewComponent, 
        WebAppointmentStatusSelectComponent,
        WebAppointmentStatusGridComponent
    ],
  declarations: [
        WebFormsUiAppointmentStatusComponent, 
        WebAppointmentStatusSelectTableViewComponent, 
        WebAppointmentStatusSelectComponent,
        WebAppointmentStatusGridComponent
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
          name: 'appointment-status-select',
          component: WebAppointmentStatusSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'appointment-status-grid',
          component: WebAppointmentStatusGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAppointmentStatusFeatureStore],
})
export class WebFormsUiAppointmentStatusSelectModule {}
