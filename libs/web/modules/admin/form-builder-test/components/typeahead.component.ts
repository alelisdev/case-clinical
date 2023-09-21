import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'typeahead_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="typeahead_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
    <!-- <button *ngIf="isSignUpProcess" [disabled]="!vm.canGoNext" mat-flat-button type="button" matStepperNext [color]="'primary'">Next</button> -->
  </div>
`,
})
export class TypeaheadComponent implements OnInit {

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
