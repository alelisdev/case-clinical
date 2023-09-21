/* eslint-disable @angular-eslint/component-selector */
import { CalendarEvent } from 'calendar-utils';
import { Subject } from 'rxjs';
import { BaseCalComponent, CalendarViewType } from '../base-cal.component';
import {
  Component,
  TemplateRef, Input} from '@angular/core';
@Component({
  selector: 'week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss']
})
export class WeekViewComponent {
  @Input() allScheduleData: any;
  @Input() startHour = 0;
  @Input() endHour = 23;
  @Input() viewDate = new Date()
  @Input() events: CalendarEvent[] = []
  @Input() refresh = new Subject<void>();
  @Input() weekViewRef?: TemplateRef<any>

  constructor(private baseCal: BaseCalComponent) { }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  headerClicked(day: Date) {
    this.baseCal.viewDate = day;
    this.baseCal.changeView(CalendarViewType.Day)
  }

  addStatAndEndField(event: any){
    if(event.event && event.event.extendedProps && event.event.extendedProps.extraData){
      return { ...event.event.extendedProps.extraData, eventStartTime: event.event.start, eventEndTime: event.event.end }
    }
    return null;
  }
}
