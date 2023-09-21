

import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { WebCoreFeatureModule } from '@case-clinical/web/core/feature'
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebAppointmentSelectComponent } from './web-appointment-select.component'
import { WebAppointmentSelectTableViewComponent } from './web-appointment-select-table-view.component'
import { WebFormsUiAppointmentComponent } from './web-appointment-ui-form.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { WebUiFormlyDesignerModule } from '@case-clinical/web/ui/formly-designer'
import { WebUiGridModule } from '@case-clinical/web/ui/grid'
import { WebAppointmentGridComponent } from './web-appointment-grid.component'

@NgModule({
  exports: [
        WebFormsUiAppointmentComponent, 
        WebAppointmentSelectTableViewComponent, 
        WebAppointmentSelectComponent,
        WebAppointmentGridComponent
    ],
  declarations: [
        WebFormsUiAppointmentComponent, 
        WebAppointmentSelectTableViewComponent, 
        WebAppointmentSelectComponent,
        WebAppointmentGridComponent
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
          name: 'appointment-select',
          component: WebAppointmentSelectComponent,
          wrappers: ['form-field'],
        },
        {
          name: 'appointment-grid',
          component: WebAppointmentGridComponent,
        }
      ],
    }),
  ],
  providers: [WebAppointmentFeatureStore],
})
export class WebFormsUiAppointmentSelectModule {}
