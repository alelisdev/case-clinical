import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-picker-example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="color_picker_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
    <!-- <button *ngIf="isSignUpProcess" [disabled]="!vm.canGoNext" mat-flat-button type="button" matStepperNext [color]="'primary'">Next</button> -->
  </div>
`,
})
export class ColorPickerComponent implements OnInit {

  formData = {

  }

  constructor() { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
