import { Component } from '@angular/core';
import { BooleanComponentStore } from './boolean.component.store';

@Component({
  selector: 'Boolean_example',
  providers: [ BooleanComponentStore ],
  template: `
  <ui-formly-form-select [formName]="'Boolean_example'"></ui-formly-form-select>
  <div class="w-full">
    <ui-formly-json-form
      formName="Boolean_example"
      [showSubmitButton]="true"
      [componentStore]="store"
    ></ui-formly-json-form>
  </div>
`,
})
export class BooleanComponent {
  constructor(public store: BooleanComponentStore) {

  }
}
