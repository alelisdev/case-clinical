import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'DateTime_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="DateTime_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class DateTimeComponent implements OnInit {

  formData = {
    users: [
      {
        name: 'John',
        age: 34,
        gender: 'Male',
      },
      {
        name: 'Alex',
        age: 23,
        gender: 'Male',
      },
      {
        name: 'Alec',
        age: 28,
        gender: 'Male',
      },
      {
        name: 'A',
        age: 20,
        gender: 'Female',
      },
      {
        name: 'B',
        age: 16,
        gender: 'Male',
      },
      {
        name: 'C',
        age: 23,
        gender: 'Female',
      },
      {
        name: 'D',
        age: 22,
        gender: 'Female',
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
