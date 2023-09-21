import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, CalendarNativeDateFormatter, CalendarDateFormatter, DateFormatterParams, DateAdapter } from 'angular-calendar';
import { BaseCalComponent } from './base-cal.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MonthViewComponent } from './month-view/month-view.component';
import { DayViewComponent } from './day-view/day-view.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { EventsListComponent } from './events-list/events-list.component'
import { NgxMaterialPopoverModule } from 'ngx-material-popover'

class CustomDateFormatter extends CalendarNativeDateFormatter {

  public dayViewHour({date, locale}: DateFormatterParams): string {
    // change this to return a different date format
    return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric', hour12: false}).format(date);
  }

}

@NgModule({
  declarations: [
    BaseCalComponent,
    MonthViewComponent,
    DayViewComponent,
    WeekViewComponent,
    YearViewComponent,
    EventsListComponent,
  ],
  imports: [
    CommonModule,
    NgxMaterialPopoverModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    })
  ],
  providers: [

  ],
  exports: [
    BaseCalComponent
  ]
})
export class BaseCalModule { }
