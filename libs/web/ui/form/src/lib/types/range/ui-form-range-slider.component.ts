import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
//import { Options } from '@angular-slider/ngx-slider';

@Component({
  template: `
  <!-- <p>Min value: <input type="number" [(ngModel)]="minValue"></p> -->
  <!-- <p>Max value: <input type="number" [(ngModel)]="maxValue"></p> -->
  <!-- <ngx-slider [(value)]="minValue" [formControl]="formControl" [(highValue)]="maxValue" [options]="slideroptions"></ngx-slider> -->
  `,
})
export class UiRangeSliderComponent extends FieldType implements OnInit {
  formControl!: FormControl

  minValue = 50;
  maxValue = 200;
  //slideroptions: Options

  ngOnInit(): void {

    // this.slideroptions = {
    //   floor: this.to.minValue ?? 50,
    //   ceil: this.to.maxValue ?? 250,
    // }
    // this.minValue = this.slideroptions.floor;
    // this.maxValue = this.slideroptions.ceil;
  }
}
