import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'DescriptionList_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="DescriptionList_example"
      [showSubmitButton]="true"
      [model]="model"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class DescriptionListComponent implements OnInit {

  formData = {
    gender: 'Male'
  }

  model = {
    name: 'John Doe',
    age: '45',
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
