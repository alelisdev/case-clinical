

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebFormsUiAppointmentStatusComponent } from './web-forms-ui-appointment-status.component'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'

@NgModule({
  exports: [WebFormsUiAppointmentStatusComponent],
  declarations: [WebFormsUiAppointmentStatusComponent],
  imports: [CommonModule, RouterModule, WebUiFormModule, WebUiButtonModule, WebUiPageHeaderModule],
})
export class WebFormsUiAppointmentStatusModule {}

