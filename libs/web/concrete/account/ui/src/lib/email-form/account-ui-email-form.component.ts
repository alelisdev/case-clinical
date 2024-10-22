import { Component, EventEmitter, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'account-email-form',
  template: `
    <ui-form (submitForm)="submit($event.payload)" [model]="model" [fields]="fields" [form]="form"></ui-form>
    <div class="text-right">
      <ui-button (handler)="submit(model)" [disabled]="!form.valid" label="Save"></ui-button>
    </div>
  `,
})
export class AccountUiEmailFormComponent {
  @Output() send = new EventEmitter()
  model = {}
  form = new FormGroup({})
  fields = [WebUiFormField.email('email', { required: true })]

  submit(payload: any) {
    this.send.emit(payload)
  }
}
