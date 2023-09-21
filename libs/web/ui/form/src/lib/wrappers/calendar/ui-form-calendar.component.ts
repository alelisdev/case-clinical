import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';
import {
  Component,
  OnDestroy, OnInit,
  ViewChild,
} from '@angular/core'
import { BaseCalComponent } from '@case-clinical/web/ui/ui-calendar';
import { distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'ui-form-calendar',
  template: `
     <app-base-cal
       (dateRangeChanged)="dateRangeChanged($event)"
       [timeEvents]="timeEvents"
       [dayViewRef]="dayViewRef"
       [weekViewRef]="weekViewRef"
       [monthViewRef]="monthViewRef"
       [startHour]="startHour"
       [endHour]="endHour"
       [displayMode]="to.displayMode"
       [simpleMode]="to.simpleMode"
       (selectDayOfMonthView)="selectDayOfMonthView($event)"
       >
     </app-base-cal>

     <ng-template #dayViewRef let-event="event">
       <ui-context-provider [data]="event" class='flex' class='h-full block' style="min-height:100px !important">
          <formly-field [field]="field.fieldGroup[0]" class="h-full block"></formly-field>
       </ui-context-provider>
     </ng-template>

     <ng-template #weekViewRef let-event="event">
       <ui-context-provider [data]="event" class='flex' class='h-full block'>
         <formly-field [field]="field.fieldGroup[1]" class="h-full block"></formly-field>
       </ui-context-provider>
     </ng-template>

     <ng-template #monthViewRef let-event="event">
       <ui-context-provider [data]="event" class='flex' class='h-full block'>
         <formly-field [field]="field.fieldGroup[2]" class="h-full block"></formly-field>
       </ui-context-provider>
     </ng-template>
  `,
  styleUrls: ['style.scss']
})
export class UiFormCalendarComponent extends UiFormBaseField implements OnInit, OnDestroy {

  @ViewChild(BaseCalComponent) calComponent: BaseCalComponent;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  formControl!: FormControl
  manualArrangement = false;
  timeEvents = []
  weeklyMode = false;
  monthlyMode = false;
  selectedDate: Date;

  startHour: number;
  endHour: number;

  ngOnInit(): void {
    super.ngOnInit();

    if (this.to.startTime) {
      const hourStr = this.to.startTime.split(':')?.at(0);
      if(hourStr) this.startHour = Number(hourStr);
      else this.startHour = 0;
      console.log({ startHour: this.startHour });
    }

    if (this.to.endTime) {
      console.log(this.to.endTime);
      const hourStr = this.to.endTime.split(':')?.at(0);
      if(hourStr) this.endHour = Number(hourStr);
      else this.endHour = 24;
      console.log({ endHour: this.endHour });
    }

    if (this.to.monthlyMode) this.monthlyMode = true
    if (this.to.monthlyMode === false && this.to.weeklyMode === true) this.weeklyMode = true
    const dataKey = this.to.dataKey;
    if (dataKey) {
      const source = this.service.getValue(dataKey);
      if (source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(components => {
          console.log('updateEvents', components)
          this.timeEvents = components ?? [];
          this.calComponent?.updateEvents(components ?? []);
        })
      } else {
        this.service.getDataStream().pipe(
          distinctUntilChanged()
        ).subscribe(_data => {
          if (_data) {
            const components = this.formService.getValueForKey(dataKey, _data);
            this.timeEvents = components ?? [];
            this.calComponent?.updateEvents(components ?? []);
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }
  }


  selectDayOfMonthView(date) {
    this.selectedDate = date
    if (this.to.selectedDate && this.to.selectedDate instanceof Function) {
      this.to.selectedDate(this.selectedDate);
    }
  }

  dateRangeChanged(data) {
    if (this.to.dateRangeChanged && this.to.dateRangeChanged instanceof Function) {
      this.to.dateRangeChanged(data);
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
