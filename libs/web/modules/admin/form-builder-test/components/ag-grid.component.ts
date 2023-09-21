import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'AgGrid_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="AgGrid_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class AgGridComponent implements OnInit {

  formData = {
    users: [
      {
        id: 1,
        name: 'John Doe',
        age: 34,
        hobby: 'Drinking',
        gender: 'Male'
      },
      {
        id: 2,
        name: 'Alex Deberbil',
        age: 30,
        gender: 'Male',
        hobby: 'Running'
      },
      {
        id: 3,
        name: 'Jane Eyre',
        age: 18,
        gender: 'Female',
        hobby: 'Running'
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
