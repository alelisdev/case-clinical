import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared';

@Component({
  selector: 'Kanban_example',
  providers: [WebLegalCaseFeatureStore],
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="Kanban_example"
      [showSubmitButton]="false"
      [formData]="formData"
      [componentStore]="store"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
})
export class KanbanComponent implements OnInit {

  formData = {
    legalCases: this.store.legalCases$
  }

  constructor(public store: WebLegalCaseFeatureStore) { }

  ngOnInit() {
    this.store.setLimit(10);
    this.store.loadLegalCasesEffect();
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
