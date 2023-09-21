import { Component, EventEmitter, Output } from '@angular/core';
import { FormService, WebUiFormField } from '@case-clinical/web/ui/form';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormlyDesignerService } from '../services/formly-designer.service';

@Component({
  template: `
    <form (ngSubmit)="submit()" class="relative w-full p-3 bg-card">
      <formly-form [model]="model"  [fields]="fields"></formly-form>
      <ui-button [label]="'Save'" type="submit" ></ui-button>
      <ui-button class='ml-4' (click)="didClose.emit()" [label]="'Close'" type="button" ></ui-button>
    </form>
  `,
  selector: 'ui-config-import',
})
export class ConfigImortComponent {
  @Output() didImport = new EventEmitter();
  @Output() didClose = new EventEmitter();

  model = {}
  options = {}
  fields = [
    WebUiFormField.heading('Import Formly Configs', 'Please paste formly field configs and click on save button'),
    WebUiFormField.code('formlyConfigs', { label: 'FormlyConfigs', required: true, editOnly: true }, { className: 'w-full' }),
  ]

  constructor(
    public formService: FormService,
    private toast: WebUiToastService,
    private formlyDesigerService: FormlyDesignerService,
  ) {
  }

  parse(formlyConfigStr: string) {
    if(!formlyConfigStr || formlyConfigStr.length === 0) return [];

    try {
      const fields = this.formlyDesigerService.parseFomlyConfig(formlyConfigStr)
      console.log({ fields });
      return fields;
    } catch(e) {
      this.toast.error('Failed to parse')
      return null;
    }
  }

  submit() {
    this.didImport.emit(this.parse(this.model['formlyConfigs']))
  }
}
