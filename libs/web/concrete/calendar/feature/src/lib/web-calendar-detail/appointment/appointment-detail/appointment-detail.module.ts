

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header'
import { WebUiPanelModule } from '@case-clinical/web/ui/panel'
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header'
import { AppointmentDetailComponent } from './appointment-detail.component'

import { WebUiDescriptionListModule } from '@case-clinical/web/ui/description-list'


@NgModule({
  declarations: [AppointmentDetailComponent],
  imports: [
    CommonModule,
    WebUiPanelModule,
    WebUiDescriptionListModule,
    WebUiCardHeaderModule,
    RouterModule.forChild([{ path: '', component: AppointmentDetailComponent }]),
    WebUiPageHeaderModule,
    WebUiButtonModule,
  ],
})
export class AppointmentDetailModule {}

