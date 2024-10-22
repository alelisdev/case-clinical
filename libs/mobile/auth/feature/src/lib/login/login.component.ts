import { Component } from '@angular/core'
import { MobileAuthStore } from '@case-clinical/mobile/auth/data-access'
import { MobileUiFormField } from '@case-clinical/mobile/ui/form'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <auth-page
        (submitForm)="submit($event)"
        [errors]="vm.errors"
        [fields]="fields"
        buttonTitle="Log in"
        linkPath="/register"
        linkTitle="Register"
        pageTitle="Login"
      >
      </auth-page>
    </ng-container>
  `,
})
export class LoginComponent {
  readonly vm$ = this.store.vm$
  readonly fields = [
    MobileUiFormField.input('email', { label: 'Email', required: true }),
    MobileUiFormField.password('password', {
      label: 'Password',
      required: true,
    }),
  ]
  constructor(private readonly store: MobileAuthStore) {}

  submit(input) {
    this.store.loginEffect(input)
  }
}
