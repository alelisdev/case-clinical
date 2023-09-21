import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebCalendarComponent } from './web-calendar.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [WebCalendarComponent],
  exports: [WebCalendarComponent],
})
export class WebCalendarModule {}
