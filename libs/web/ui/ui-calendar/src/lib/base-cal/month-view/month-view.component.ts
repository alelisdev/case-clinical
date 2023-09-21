/* eslint-disable @angular-eslint/component-selector */
import { Component, HostListener, Input, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { CalendarEvent } from 'calendar-utils'
import { Subject } from 'rxjs'
import { BaseCalComponent, CalendarViewType } from '../base-cal.component'
import { MenuPositionX, MenuPositionY } from '@angular/material/menu'
import { NgxMaterialPopoverComponent } from 'ngx-material-popover'

@Component({
  selector: 'month-view',
  templateUrl: './month-view.component.html',
  styles: [
    `
      .cal-month-view .cal-day-cell {
        min-height: 50px;
      }
    `,
  ],
})
export class MonthViewComponent implements OnInit {
  @Input() activeDay = new Date(2022, 12, 6)
  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>()
  @Input() showEvents = true
  @Input() displayMode = 0
  @Input() monthViewRef?: TemplateRef<any>
  tooSmallForEvents = false

  @ViewChild('popover', { static: true })
  readonly popover!: NgxMaterialPopoverComponent
  xPosition: MenuPositionX = 'after'
  yPosition: MenuPositionY = 'below'

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    if (event.target.innerWidth < 650) {
      this.tooSmallForEvents = false
    } else {
      this.tooSmallForEvents = true
    }
  }

  constructor(private baseCal: BaseCalComponent) {}

  ngOnInit(): void {
    if (window.innerWidth < 650) {
      this.tooSmallForEvents = false
    } else {
      this.tooSmallForEvents = true
    }
  }

  updateDate(date: Date) {
    this.baseCal.setViewDate(date)
    if (this.displayMode === 0) this.baseCal.view = CalendarViewType.Day
    this.activeDay = date
    this.refresh.next()
  }

  isSelectedDate(selectedDate: Date): boolean {
    if (
      selectedDate.getFullYear() == this.viewDate.getFullYear() &&
      selectedDate.getMonth() == this.viewDate.getMonth() &&
      selectedDate.getDate() == this.viewDate.getDate()
    ) {
      return true
    } else {
      return false
    }
  }

  isToday(selectedDate: Date): boolean {
    const today = new Date()
    if (
      selectedDate.getFullYear() == today.getFullYear() &&
      selectedDate.getMonth() == today.getMonth() &&
      selectedDate.getDate() == today.getDate()
    ) {
      return true
    } else {
      return false
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }
  addStatAndEndField(event: any) {
    if (event && event.extendedProps && event.extendedProps.extraData) {
      return {
        ...event.extendedProps.extraData,
        eventStartTime: event.start,
        eventEndTime: event.end,
        title: event.title,
      }
    }
    return null
  }
  
}
