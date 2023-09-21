import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { User } from '@case-clinical/web/core/data-access'
import { WebUiFormField } from '@case-clinical/web/ui/form'

@Component({
  selector: 'account-username-form',
  template: `
    <div class="md:px-2 lg:px-0 lg:col-span-9 dark:bg-gray-800 bg-white rounded-lg shadow">
      <ui-page-header title="Username"></ui-page-header>
      <div class="px-6 pt-6">
        <ui-form (submitForm)="submit($any(user))" [model]="user" [fields]="fields" [form]="form">
          <div
            class="-mx-6 -mb-4 mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-transparent dark:border-gray-700 text-right sm:px-6 rounded-b-lg space-x-3"
          >
            <ui-button label="Discard" variant="white" (click)="handleDiscardClick($event)"></ui-button>
            <ui-button label="Save" type="submit"></ui-button>
          </div>
        </ui-form>
      </div>
    </div>
  `,
})
export class AccountUiUsernameFormComponent {
  @Input() user: User = {}
  @Output() send = new EventEmitter()
  form = new FormGroup({})
  fields = [
    WebUiFormField.input('username', {
      minLength: 3,
      maxLength: 25,
      label: 'Username',
    }),
  ]

  submit({ username }) {
    this.send.emit({ username })
  }

  handleDiscardClick(event) {}
}
