import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { WeekDay } from 'calendar-utils';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { Subject } from 'rxjs';
import { BaseCalComponent } from '../base-cal.component';

@Component({
  selector: 'EventButton',
  templateUrl: './eventsButton.component.html',
})
export class EventButton implements OnInit {
  @Input() label;
  
  ngOnInit(): void {
    
  }

}
