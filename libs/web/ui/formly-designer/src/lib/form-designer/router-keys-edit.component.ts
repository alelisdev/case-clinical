import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form';

@Component({
  selector: 'ui-router-keys-edit',
  template: `
    <form [formGroup]="formService.form" class="h-full rounded-sm overflow-hidden mb-2 p-5 bg-gray-50 dark:bg-gray-900" novalidate (ngSubmit)="submit(formModel)">
      <div>
        <formly-form [fields]="fields" [form]="formService.form" [model]="formModel" [options]="options"></formly-form>
      </div>
      <ui-button [label]="'Save'" type="submit" ></ui-button>
      <ui-button [label]="'Cancel'" type="button" class="ml-2" (click)="close.emit()"></ui-button>
    </form>
    `,
})
export class WebUiRouterKeysEditComponent implements OnInit {
  @Input() routerKeys: string[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>()

  fields: any[]
  formModel: {}

  constructor(public formService: FormService) {
  }

  ngOnInit(): void {
    this.formModel = {
      keys: this.routerKeys?.map((key) => ({ key }))
    }

    this.fields = [
      WebUiFormField.title('Extract Router Keys'),
      WebUiFormField.repeat('keys', { label: 'Router Keys' }, WebUiFormField.input('key', { required: true }))
    ]
  }

  options = {
    formState: {

    }
  }

  submit(formData) {
    this.save.emit(formData['keys'].map((el) => el.key))
  }
}
