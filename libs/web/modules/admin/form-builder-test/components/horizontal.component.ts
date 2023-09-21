import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Horizontal_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Horizontal_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class HorizontalComponent implements OnInit {

  formData = {
    tags: [
      {
        name: 'Angular',
      },
      {
        name: 'React',
      },
      {
        name: 'Vue',
      },
      {
        name: 'Php',
      },
      {
        name: 'Laravel',
      },
      {
        name: 'Swift',
      },
      {
        name: 'Android',
      },
      {
        name: 'iPhone',
      },
      {
        name: 'C++',
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
