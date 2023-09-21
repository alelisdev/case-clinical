/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  TemplateRef, OnInit, ChangeDetectorRef, Input, Output, EventEmitter,
} from '@angular/core';
import {
  format,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarMonthViewComponent,
} from 'angular-calendar';
import { WeekDay } from 'calendar-utils';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'

interface ExtendedCalendarEvent extends CalendarEvent {
  extendedProps: {
    extraData: any
  };
}

export enum CalendarViewType {
  Week = "Week",
  Month = "Month",
  Day = "Day",
  List = "List"
}

@Component({
  selector: 'app-base-cal',
  templateUrl: './base-cal.component.html',
})
export class BaseCalComponent implements OnInit {
  @Input() weeklyMode: boolean | undefined | null;
  @Input() monthlyMode: boolean | undefined | null;
  @Input() allScheduleData: any;
  @Input() timeComponent?: TemplateRef<any>
  @Input() dayViewRef?: TemplateRef<any>
  @Input() weekViewRef?: TemplateRef<any>
  @Input() monthViewRef?: TemplateRef<any>
  @Input() displayMode: number;
  @Input() simpleMode: boolean;
  @Input() timeEvents: any[]
  @Input() startHour: number
  @Input() endHour: number
  @Output() selectDayOfMonthView = new EventEmitter();
  @Output() dateRangeChanged = new EventEmitter();

  view: CalendarViewType = CalendarViewType.Month;
  CalendarViewType = CalendarViewType;
  viewDate: Date = new Date();
  viewDateString = "Today";
  showView = false;
  weekViewHeaderDays: WeekDay[] = [];
  events: ExtendedCalendarEvent[] = [];
  calViewString = ""

  something = CalendarMonthViewComponent
  constructor(private route: ActivatedRoute, private router: Router, private changeDetector: ChangeDetectorRef) { }

  private startDate: Date;
  private endDate: Date;

  refresh = new Subject<void>();
  activeDayIsOpen = true;

  ngOnInit(): void {
    switch (this.displayMode) {
      case 0: {
        this.changeView(CalendarViewType.Month);
        break;
      }
      case 1: {
        this.view = CalendarViewType.Month;
        break;
      };
      case 2: {
        this.view = CalendarViewType.Week;
        break;
      };
      case 3: {
        this.view = CalendarViewType.Day;
        break;
      };
      case 4: {
        this.view = CalendarViewType.List;
        break;
      };
    }
  }

  udpateCalViewString() {
    switch (this.view) {
      case CalendarViewType.Day: {
        this.calViewString = format(this.viewDate, "MMM dd yyyy")
        break;
      };
      case CalendarViewType.List:
      case CalendarViewType.Month: {
        this.calViewString = format(this.viewDate, "MMMM, yyyy");
        break;
      };
      case CalendarViewType.Week: {
        this.calViewString = format(this.viewDate, "MMM dd yyyy");
        break;
      }
    }
  }

  changeView(toView: CalendarViewType) {
    if (this.displayMode === 0) this.view = toView;
    this.updateViewString()
    this.udpateCalViewString()
    this.showView = false;
  }

  setViewDate(newDate: Date) {
    if (newDate) this.selectDayOfMonthView.emit(newDate)
    this.viewDate = newDate
    this.updateViewString()
    this.udpateCalViewString()
    this.refresh.next()
  }

  incrementViewDate(increase: boolean) {
    const viewDateMoment = moment(this.viewDate);
    if (increase) {
      switch (this.view) {
        case CalendarViewType.Day: {
          viewDateMoment.add(1, 'days');
          this.viewDate = viewDateMoment.toDate();
          break;
        };
        case CalendarViewType.List:
        case CalendarViewType.Month: {
          viewDateMoment.add(1, 'month');
          this.viewDate = viewDateMoment.toDate();
          break;
        };
        case CalendarViewType.Week: {
          viewDateMoment.add(1, 'week');
          this.viewDate = viewDateMoment.toDate();
          break;
        }
      }
    } else {
      switch (this.view) {
        case CalendarViewType.Day: {
          viewDateMoment.subtract(1, 'days');
          this.viewDate = viewDateMoment.toDate();
          break;
        };
        case CalendarViewType.List:
        case CalendarViewType.Month: {
          viewDateMoment.subtract(1, 'month');
          this.viewDate = viewDateMoment.toDate();
          break;
        };
        case CalendarViewType.Week: {
          viewDateMoment.subtract(1, 'week');
          this.viewDate = viewDateMoment.toDate();
          break;
        }
      }
    }
    this.updateViewString()
    this.udpateCalViewString()
    this.updateEvents();
  }

  getDateRange() {
    switch (this.view) {
      case CalendarViewType.Day: {
        this.startDate = moment(this.viewDate).startOf('day').toDate();
        this.endDate = moment(this.viewDate).endOf('day').toDate();
        break;
      }
      case CalendarViewType.Month: {
        const monthStartDate = moment(this.viewDate).startOf('month').toDate();
        const monthEndDate = moment(this.viewDate).endOf('month').toDate();
        this.startDate = moment(monthStartDate).startOf('week').toDate();
        this.endDate = moment(monthEndDate).endOf('week').toDate();
        break;
      }
      case CalendarViewType.List: {
        this.startDate = moment(this.viewDate).startOf('month').toDate();
        this.endDate = moment(this.viewDate).endOf('month').toDate();
        break;
      }
      case CalendarViewType.Week: {
        this.startDate = moment(this.viewDate).startOf('week').toDate();
        this.endDate = moment(this.viewDate).endOf('week').toDate();
        break;
      }
    }

    this.dateRangeChanged.emit({
      start: this.startDate,
      end: this.endDate
    })
  }

  updateViewString() {
    const today = new Date()
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    const todayBroken = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (tomorrow.getFullYear() == this.viewDate.getFullYear() && tomorrow.getMonth() == this.viewDate.getMonth() && tomorrow.getDate() == this.viewDate.getDate()) {
      this.viewDateString = "Tomorrow"

    } else if (yesterday.getFullYear() == this.viewDate.getFullYear() && yesterday.getMonth() == this.viewDate.getMonth() && yesterday.getDate() == this.viewDate.getDate()) {
      this.viewDateString = "Yesterday"
    } else if (todayBroken.getFullYear() == this.viewDate.getFullYear() && todayBroken.getMonth() == this.viewDate.getMonth() && todayBroken.getDate() == this.viewDate.getDate()) {
      this.viewDateString = "Today"
    } else {
      this.viewDateString = format(this.viewDate, 'dd MMM, yyyy');
    }

    this.getDateRange();
  }

  selectToday() {
    this.viewDate = new Date()
    this.updateViewString()
    this.udpateCalViewString()
  }

  updateEvents(timeEvents: ExtendedCalendarEvent[] = undefined) {
    if(timeEvents) this.timeEvents = timeEvents;

    this.events = this.timeEvents.filter((event) => {
      return event.start >= this.startDate && event.end <= this.endDate;
    }).map((event) => ({
      id: event.id,
      start: event.start,
      end: event.end,
      title: event.title ?? `${event.data.start}-${event.data.end}`,
      providerName: event.providerName,
      status: event.status,
      extendedProps: {
        extraData: event.data
      }
    }));
    console.log('filtered events = ', this.events, this.startDate, this.endDate);
    this.refresh.next();
  }
}
