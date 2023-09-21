import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { FormLayout } from '@case-clinical/web/core/data-access';
import { WebUiFormField } from '@case-clinical/web/ui/form';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

@Component({
  selector: 'ui-child-form-create',
  styleUrls: ['./child-form-create.component.scss'],
  template: `
  <ui-context-provider [data]="{}" class='flex'>
    <form #ngForm [formGroup]="form" (ngSubmit)="submit()" *ngIf="fields" class="relative w-full">
      <formly-form [model]="model" [fields]="fields" [options]="options" [form]="form" class="w-full"></formly-form>
      <button #SubmitButton mat-flat-button type="submit" class="bg-blue-600 rounded-md mx-4 mb-2 text-white py-5 px-6" [disabled]="!this.form.valid">Save</button>
    </form>
    </ui-context-provider>
  `,
})
export class ChildFormCreateComponent implements OnInit {
  @Input() model: FormLayout = {};
  @Input() edit = false;
  @Output() submitAction = new EventEmitter();

  options: FormlyFormOptions;
  fields: FormlyFieldConfig[]
  form = new FormGroup({});

  constructor() {
    this.options = {
      formState: {}
    };
  }

  ngOnInit(): void {
    if(this.model) {
      const { id, order, title } = this.model;
      this.model = { id, order, title };
    }
    this.fields = [
      WebUiFormField.fieldRow([
        WebUiFormField.paragraph({ html: `${this.edit ? 'Edit Selected' : 'Create New'} Child Form` }, { className: 'text-gray-800 text-lg font-bold text-center w-full' }),
        WebUiFormField.input('title', { label: 'Title', required: true }, { className: 'w-full px-1' }),
        WebUiFormField.number('order', { label: 'Order', readonly: this.model.order === -1, required: true }, { className: 'w-full px-1' }),
      ], 'w-full p-4', { className: 'w-full p-4' })
    ];
  }

  submit() {
    console.log(this.model);
    this.submitAction.emit(this.model);
  }
}
