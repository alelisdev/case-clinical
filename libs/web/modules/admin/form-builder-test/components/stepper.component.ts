import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'Stepper_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Stepper_example"
      [showSubmitButton]="true"
      [formData]="formData"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class StepperComponent implements OnInit {

  formData = {

  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
