import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Vertical_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Vertical_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class VerticalComponent implements OnInit {

  formData = {
    users: [
      {
        name: 'Name A',
        show: true,
        status: 'Pending',
      },
      {
        name: 'Name B',
        show: true,
        status: 'Cancelled',
      },
      {
        name: 'Name C',
        show: false,
        status: 'Approved',
      },
      {
        name: 'Name D',
        show: true,
        status: 'Pending',
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
