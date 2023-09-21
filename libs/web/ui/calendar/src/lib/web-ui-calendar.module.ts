import { NgModule } from '@angular/core'

import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { WebUiCalendarComponent } from './web-ui-calendar.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatSelectModule } from '@angular/material/select'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import momentPlugin from '@fullcalendar/moment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material'
import { MAT_DATE_FORMATS } from '@angular/material/core'
import { ClickOutsideModule } from 'ng-click-outside'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'

// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   timeGridPlugin,
//   listPlugin,
//   momentPlugin,
//   rrulePlugin,
//   interactionPlugin,
// ])

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    MatSelectModule,
    MatNativeDateModule,
    MatRippleModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    ClickOutsideModule,
  ],
  declarations: [WebUiCalendarComponent],
  exports: [WebUiCalendarComponent],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'DD.MM.YYYY',
        },
        display: {
          dateInput: 'DD.MM.YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD.MM.YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class WebUiCalendarModule {}
