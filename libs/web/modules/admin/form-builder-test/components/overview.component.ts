import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Overview_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Overview_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class OverviewComponent implements OnInit {

  formData = {
    "profits": of(
      [
        {
          "year": '2012',
          "import": 234,
          "export": 12
        },
        {
          "year": '2013',
          "import": 134,
          "export": 16
        },
        {
          "year": '2014',
          "import": 500,
          "export": 120
        }
      ]
    )
  }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
