import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { UiFormBaseField } from '../base-field-type';

@Component({
  selector: 'ui-schema-driven-finance-report-gauge',
  templateUrl: './finance-report-gauge.component.html',
  styleUrls: ['./finance-report-gauge.component.css']
})
export class FinanceReportGaugeComponent extends UiFormBaseField implements OnInit, OnDestroy {
  subscriber?: any;
  value = 0.99;
  title = '';
  roundTo = 2

  mode = 'default';
  regionConfig = [];
  colorConfig = {
    gray: '#1a202c',
    red: '#F56565',
    orange: '#ED8936',
    yellow: '#ECC94B',
    green: '#48BB78'
  };

  minAngle = -176;
  maxAngle = 104;

  get computedNeedleRotation() {
    const total = this.maxAngle - this.minAngle;
    const percent = total * Math.min(Math.max(0, this.value),1);
    const deg = this.minAngle + percent;
    return `rotate(${deg}deg)`;
  }

  get computedNeedleColor() {
    const val = Math.max(0,Math.min(100,this.value * 100));
    const region = this.regionConfig.find(({ min, max }) => val <= max && val >= min);
    return this.mode === 'reverse' ? region?.reverseColor : region?.color;
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.title = this.to.title;
    this.roundTo = this.to.roundTo ?? 2;
    this.mode = this.to.mode ?? 'reverse';

    this.regionConfig = [
      { min: 0, max: 21, color: this.colorConfig.green , reverseColor : this.colorConfig.red},
      { min: 22, max: 40, color: this.colorConfig.yellow , reverseColor : this.colorConfig.orange },
      { min: 41, max: 75, color: this.colorConfig.orange , reverseColor : this.colorConfig.yellow },
      { min: 75, max: 100, color: this.colorConfig.red , reverseColor : this.colorConfig.green }
    ];

    let useKey = this.to.useKey;
    if(useKey === undefined) useKey = 0;
    if(useKey === 0) {
      this.value = this.to.value ?? 0.99;
    } else {
      this.subscriber = this.service.getDataStream().subscribe(() => {
        const _value = this.service.getValue(this.to.valueKey);
        this.value = Number(_value);
      })
    }
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriber?.unsubscribe();
  }

  getValue(num : number){
    return this.roundingFunc(num * 100, this.roundTo)
  }

  roundingFunc(num: number, places: number) {
    const factor = 10 ** places;
    const val =  Math.round(num * factor) / factor;
    // val =  (Math.ceil(val *100))/100
    return val
  }

  public get Style() : string {
    return this.to.titleStyle ?? 'ml-2 text-gray-900 dark:text-red-50 lg:ml-0 text-3xl mt-5 mb-8 font-bold tracking-tight leading-none'
  }

}
