import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUserCalendarComponent } from './web-user-calendar.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebUserCalendarComponent],
  exports: [WebUserCalendarComponent],
})
export class WebUserCalendarModule {}
