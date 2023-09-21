import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'PieChart_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="PieChart_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class PieChartComponent implements OnInit {

  formData = {
    languages: [
      {
        label: 'English',
        value: 33
      },
      {
        label: 'French',
        value: 13
      },
      {
        label: 'Chinese',
        value: 43
      },
      {
        label: 'Spanish',
        value: 5
      },
    ],
    stats: [
      {
        label: '2019',
        value: 23,
      },
      {
        label: '20120',
        value: 3,
      },
      {
        label: '2021',
        value: 10,
      },
      {
        label: '2022',
        value: 15,
      },
      {
        label: '2023',
        value: 9,
      },
      {
        label: '2014',
        value: 10,
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
