import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'SvgView_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="SvgView_example"
      [showSubmitButton]="true"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class SvgViewComponent implements OnInit {

  model = {
    createdAt: '2023-04-05',
    firstName: 'John',
    lastName: "Doe",
    pharmacyControlNumber: 'PCHI',
    medicalRecordNumber: "ETEG344545",
    pchGroupNumber: "IHYMA",
    color: "#ff9e00",
  }

  constructor(private data: WebCoreDataAccessService) { }

  ngOnInit() {
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
