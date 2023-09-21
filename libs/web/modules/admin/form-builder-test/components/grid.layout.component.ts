import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { GridLayoutComponentStore } from './grid.layout.component.store';
import { products } from './data'

@Component({
  selector: 'GridLayout_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="GridLayout_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
providers: [
  GridLayoutComponentStore
]
})
export class GridLayoutComponent implements OnInit {

  formData = {
    products: products
  }

  constructor(private data: WebCoreDataAccessService, private store: GridLayoutComponentStore) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
