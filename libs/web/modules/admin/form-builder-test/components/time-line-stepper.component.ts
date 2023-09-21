import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'TimeLineStepper_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="TimeLineStepper_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class TimeLineStepperComponent implements OnInit {

  formData = {
    "milestones": [
      {
        "date": "2024-12-11",
        "sender": "John Doe"
      },
      {
        "date": "2024-12-15",
        "sender": "Felix"
      },
      {
        "date": "2024-12-19",
        "sender": "Michael"
      }
    ],
    timelines: [
      {
        title: 'Action Attempt',
        value: '2022-08-02',
      },
      {
        title: 'Action Taken',
        value: 'Fax',
      },
      {
        title: 'Request Count',
        value: 5,
      },
      {
        title: 'Notes',
        value: '',
      },
    ]
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
