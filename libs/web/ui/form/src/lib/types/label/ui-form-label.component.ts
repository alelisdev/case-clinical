import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'
import { FormService } from '../../form.service'
import * as moment from 'moment';
@Component({
  template: `
    <label
      class="block text-md font-bold"
    >
      {{ to.label }}
      <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
    </label>
    <div *ngIf="!value && (getValueType(value) !== 'boolean')" class="text-sm text-gray-50 mb-3">{{ 'No data' }}</div>
    <div *ngIf="getValueType(value) === 'boolean'" class="text-sm text-gray-50 mb-3">{{ value }}</div>
    <ng-container *ngIf="value  && (getValueType(value) !== 'boolean')" [ngSwitch]="to.format">
      <ng-container *ngSwitchCase="'currency'">
        <div class="text-sm text-secondary mb-3">{{ value | currency }}</div>
      </ng-container>
      <ng-container *ngSwitchCase="'date'">
        <div class="text-sm text-secondary mb-3">{{ value }}</div>
      </ng-container>
      <ng-container *ngSwitchCase="'percent'">
        <div class="text-sm text-secondary mb-3">{{ value }}%</div>
      </ng-container>
      <ng-container *ngSwitchCase="'dateTime'">
        <div class="text-sm text-secondary mb-3">{{ this.checkformatedDateTime(valueDateTime) }}</div>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <div class="text-sm text-secondary mb-3 break-all">{{ value }}</div>
      </ng-container>
    </ng-container>
  `,
  styleUrls:['./style.scss']
})
export class UiFormLabelComponent extends FieldType {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formService: FormService,
  ) {
    super()
  }


  checkformatedDateTime(datevalue:string){
    return moment(datevalue).format("YYYY-MM-DD h:mm:ss a");
  }

  get value() {
    return this.formService ? this.formService.getValueForKey(this.to.dataKey, this.model) : "";
  }

  get valueDateTime() {
    return this.formService ? this.formService.getValueForKey(this.to.dataKey, this.model, true) : "";
  }

  get classNames(): string {
    return this.showError
      ? 'border-red-300 text-red-900 placeholder-red-400 focus:outline-none focus:ring-red-500 focus:border-red-500'
      : ''
  }

  get classes(): string {
    return 'shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md block w-full sm:text-sm'
  }
  getValueType(value: any): string{
    return typeof value
  }
}
