import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Grid_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Grid_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class GridComponent implements OnInit {

  formData = {
    accidentTypes: this.filterAccidentTypes()
  }

  constructor(private data: WebCoreDataAccessService) { }

  filterAccidentTypes() {
    return this.data.userAccidentTypes({ input: {} }).pipe(
      switchMap((response) => of(response.data.items))
    )
  }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
