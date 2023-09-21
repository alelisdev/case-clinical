

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'

import { AppointmentCreateComponent } from './appointment-create.component'

@NgModule({
  declarations: [AppointmentCreateComponent],
  imports: [
    CommonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiPanelModule,
    WebUiCardHeaderModule,
    WebUiPageHeaderModule,
    RouterModule.forChild([{ path: '', component: AppointmentCreateComponent }]),
  ],
})
export class AppointmentCreateModule {}

