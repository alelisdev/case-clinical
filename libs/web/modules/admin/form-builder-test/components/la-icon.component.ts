import { switchMap } from 'rxjs/operators';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { LaIconStore } from './la-icon.component.store';
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared';

@Component({
  selector: 'LaIcon_example',
  template: `
  <div class="w-full">
    <ui-formly-json-form
      formName="LaIcon_example"
      [showSubmitButton]="false"
      [formData]="formData"
      [componentStore]="store"
      [model]="model"
      (save)="submit($event)"
    ></ui-formly-json-form>
  </div>
`,
  providers: [
    LaIconStore,
    WebGenderFeatureStore,
  ]
})
export class LaIconComponent implements OnInit, OnDestroy {

  vm$ = this.store.vm$;
  subscriber?: any;
  formData = {}


  model = {
    user: {
      name: 'John Doe'
    }
  }

  constructor(public store: LaIconStore) { }

  ngOnInit() {
    this.subscriber = this.vm$.subscribe((vm) => {
      console.log({ vm })
      this.formData = this.getFormData(vm);
    })
  }

  getFormData(data: any) {
    return data;
  }



  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  submit(data) {
    alert(JSON.stringify(data));
  }
}
