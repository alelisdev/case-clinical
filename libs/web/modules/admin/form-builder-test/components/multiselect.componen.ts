import { Component, OnInit } from '@angular/core';
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared';
import { MultiSelectComponentStore } from './multiselect.component.store';
import { of } from 'rxjs';

@Component({
  selector: 'MultiSelect_example',
  providers: [ WebDiagnosisCodeFeatureStore, MultiSelectComponentStore ],
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="MultiSelect_example"
      [showSubmitButton]="true"
      [formData]="formData"
      [componentStore]="store"
      [model]="model"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class MultiSelectComponent implements OnInit {

  formData = {
    codes: of([
      {
        id: '123',
        name: '123',
      },
      {
        id: '456',
        name: '456',
      },
      {
        id: '789',
        name: '789',
      },
    ]),
    selectedCodes: this.store.selectedCodes$,
  }

  model = {
    codes: ['aa']
  }

  constructor(public store: MultiSelectComponentStore) { }

  ngOnInit() {

  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
