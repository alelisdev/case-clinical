import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Table_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Table_example"
      [showSubmitButton]="false"
      [formData]="formData"
    ></ui-formly-json-form>
  </div>
`,
})
export class TableComponent {

  formData = {
    users: [
     {
      id: 1,
      name: 'User 1',
      gender: 'Male',
      posts: [
        {
          id: 1,
          title: 'Post 1',
          year: 2023,
          price: 34.30
        },
        {
          id: 1,
          title: 'Post 2',
          year: 2023,
          price: 50.00
        },
      ]
     },
     {
      id: 2,
      name: 'User 2',
      gender: 'Female',
      posts: [
        {
          id: 3,
          title: 'Post 3',
          year: 2018,
          price: 134.30
        },
        {
          id: 4,
          title: 'Post 4',
          year: 2017,
          price: 150.00
        },
        {
          id: 5,
          title: 'Post 5',
          year: 2019,
          price: 130.00
        },
      ]
     },
    ]
  }
}
