
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Template } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'
import { WebTemplateSelectFormStore } from './web-template-select-form.store'
import { pluck } from 'rxjs'

@Component({
  selector: 'ui-template-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow p-4">
      <div class="px-6 pt-6">
      <ui-formly-json-form
        [formName]="template.id ? 'template_edit' : 'template_create'"
        [showSubmitButton]="true"
        [formData]="template || {}"
        (save)="submit($any(template))"
        (discard)="close.emit()"
      ></ui-formly-json-form>
      </div>
    </div>
  `,
})
export class WebFormsUiTemplateComponent
    {
  @Input() template: Template = {}
  @Output() send = new EventEmitter<any>()
  @Output() close = new EventEmitter()

  form = new FormGroup({ })
  
  model: any = {}

 

  options = {
    formState: {
      mainModel: this.model,
    },
  }

fields = [
				WebUiFormField.fieldRow([
,
WebUiFormField.input('id', { label: 'Id' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1', hide: true}),
WebUiFormField.input('name', { label: 'Name' }, 
{
className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'
}),
WebUiFormField.input('attachment', { label: 'Attachment' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('encoding', { label: 'Encoding' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
WebUiFormField.input('signatureFileType', { label: 'Signature File Type' }, {className: 'sm:w-full md:w-1/2 lg:w-1/4  px-1'}),
,
				])

]

  constructor(
        private readonly store: WebTemplateSelectFormStore,
        private readonly route: ActivatedRoute
    ) {}


  async submit(input) {
    const { id, name,attachment,encoding,signatureFileType } = input;
    if (id !== undefined) {
      this.store.updateTemplateEffect({ input: { id, name,attachment,encoding,signatureFileType }, resultEmitter: this.send })
    } else {
      this.store.createTemplateEffect({ input: { name,attachment,encoding,signatureFileType }, resultEmitter: this.send })
    }
  }
}
