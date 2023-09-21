import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebUiFormField } from '../../form/src/lib/web-ui-form.field'
@Component({
  selector: 'firm-form',
  template: `
    <ui-form (submitForm)="submit($event.payload)" [model]="model" [fields]="fields" [form]="form"></ui-form>
    <div class="text-right">
      <ui-button (handler)="submit(model)" [disabled]="!form.valid" label="Save"></ui-button>
    </div>
  `,
})
export class FirmFormComponent {
  @Output() send = new EventEmitter()
  model = {}
  form = new FormGroup({})
  fields = [
    WebUiFormField.fieldRow([
      WebUiFormField.input('id', { label: 'Id' }, { className: 'w-1/2  px-1', hide: true }),
      WebUiFormField.input('name', { label: 'Name' }, { className: 'w-full px-1' }),
    ]),
    WebUiFormField.fieldRow([WebUiFormField.input('line1', { label: 'Line 1' }, { className: 'w-full  px-1' })]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('city', { label: 'City' }, { className: 'w-1/2  px-1' }),
      WebUiFormField.input('state', { label: 'State' }, { className: 'w-1/4  px-1' }),
      WebUiFormField.input('postalCode', { label: 'Postal Code' }, { className: 'w-1/4  px-1' }),
    ]),
    WebUiFormField.fieldRow([
      WebUiFormField.input('phoneNumber', { label: 'Phone Number' }, { className: 'w-1/2  px-1' }),
    ]),
  ]

  submit(payload: any) {
    this.send.emit(payload)
  }
}
