import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form';

@Component({
  selector: 'ui-submit-action-field-edit',
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
export class WebUiSubmitActionEditComponent implements OnInit {
  @Input() submitAction: string;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>()

  fields: any[]
  formModel: {}

  defaultSubmitAction = `(formData) => {\n\tconsole.log('doSubmit')\n}`

  constructor(public formService: FormService) {
  }

  ngOnInit(): void {
    this.formModel = {}

    if(this.submitAction) {
      this.formModel['defineSubmitAction'] = true;
      this.formModel['submitAction'] = this.submitAction;
    } else {
      this.formModel['submitAction'] = this.defaultSubmitAction;
    }

    this.fields = [
      WebUiFormField.title('Define submit action'),
      WebUiFormField.heading('Submit Action', 'Please write submit process'),
      WebUiFormField.boolean('defineSubmitAction', { label: "Define submit action" }, { className: 'w-full' }),
      WebUiFormField.code('submitAction', { label: 'Submit Action' }, {
        className: 'w-full',
        hideExpression: '!model.defineSubmitAction'
      })
    ]
  }

  options = {
    formState: {

    }
  }

  submit(formData) {
    if(formData['defineSubmitAction']) {
      this.save.emit(formData['submitAction']);
    } else {
      this.save.emit(null);
    }
  }
}
