import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormlyFieldConfig } from '@ngx-formly/core'
import { Observable, Subject, takeUntil } from 'rxjs';
import { UiFormBaseField } from '../../types/base-field-type';

@Component({
  styleUrls:['./style.scss'],
  templateUrl:'./timeline-stepper.component.html'
})
export class TimeLineStepperComponent extends UiFormBaseField implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  manualArrangement = false;

  primaryField: FormlyFieldConfig;
  secondaryField: FormlyFieldConfig;
  horizontalItems = []

  displayMode: string;

  style = "";

  ngOnInit(): void {
    this.displayMode = this.to.displayMode ?? 'default';
    const dataKey = this.to.dataKey;
    if (dataKey) {
      if(this.field.fieldGroup.length > 0) {
        const timeLineStepWrapper = this.field.fieldGroup[0];
        if(timeLineStepWrapper) {
          this.primaryField = timeLineStepWrapper?.fieldGroup?.at(0);
          this.secondaryField = timeLineStepWrapper?.fieldGroup?.at(1);
        }
      }

      const source = this.service.getValue(dataKey);
      console.log('timeline-stepper.component.ts: source = ', source);
      if(source instanceof Observable) {
        source.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
          this.horizontalItems = data
        })
      } else if(source instanceof Array) {
        this.horizontalItems = source;
      } else {
        this.service.getDataStream().pipe(takeUntil(this._unsubscribeAll)).subscribe(_data => {
          if(_data) {
            this.horizontalItems = this.formService.getValueForKey(dataKey, _data);
          }
        })
      }
    } else {
      this.manualArrangement = true;
    }
  }

  getPrimaryField(timelineWrapper: any) {
    return timelineWrapper?.fieldGroup?.at(0);
  }

  getSecondaryField(timelineWrapper: any) {
    return timelineWrapper?.fieldGroup?.at(1);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll?.next(null);
    this._unsubscribeAll?.complete();
  }
}
