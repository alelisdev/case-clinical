import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'example-enumeration',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="enumeration_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
    <!-- <button *ngIf="isSignUpProcess" [disabled]="!vm.canGoNext" mat-flat-button type="button" matStepperNext [color]="'primary'">Next</button> -->
  </div>
`,
})
export class EnumerationComponent implements OnInit {

  formData = {
    title: "This is my title",
    genders: [ 'Male', 'Female' ],
    days: [ 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ],
    states: [ 'US', 'MX', 'CA', 'UK' ],
    levels: [ 'beginner', 'intermediate', 'expert' ],
  }

  constructor() { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
