import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MobileUiFormField } from '@case-clinical/mobile/ui/form'

@Component({
  selector: 'account-password-form',
  template: `
    <ui-form (submitForm)="submit($event.payload)" [model]="model" [fields]="fields" [form]="form"></ui-form>
    <div class="">
      <ui-button (handler)="submit(model)" [disabled]="!form.valid" label="Reset"></ui-button>
    </div>
  `,
})
export class AccountUiPasswordFormComponent {
  @Output() send = new EventEmitter()
  model = {}
  form = new FormGroup({})
  fields = [
    MobileUiFormField.password('currentPassword', {
      label: 'Current password',
      required: true,
      minLength: 10,
    }),
    MobileUiFormField.password('password', {
      label: 'New password',
      required: true,
      minLength: 10,
    }),
    MobileUiFormField.password('verified', {
      label: 'Verify new password',
      required: true,
      minLength: 10,
    }),
  ]

  submit(payload: any) {
    this.send.emit(payload)
  }
}
