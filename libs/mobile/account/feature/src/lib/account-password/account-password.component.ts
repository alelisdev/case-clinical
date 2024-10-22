import { Component } from '@angular/core'
import { AccountUpdatePasswordInput } from '@case-clinical/mobile/core/data-access'
import { AccountPasswordStore } from './account-password.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.loading">
        <div class="">
          <ui-loader></ui-loader>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.errors">
        <div class="">
          <div class="">An error occurred:</div>
          <pre class="">{{ vm.errors }}</pre>
        </div>
      </ng-container>
      <ng-container *ngIf="!vm.loading && !vm.errors">
        <div class="">
          <div class="">
            <div class="">Change Password</div>
            <div class="">
              <account-password-form (send)="updatePassword($event)"></account-password-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountPasswordStore],
})
export class AccountPasswordComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountPasswordStore) {}

  updatePassword(password: AccountUpdatePasswordInput) {
    this.store.updatePasswordEffect(password)
  }
}
