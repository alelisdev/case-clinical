import { Component } from '@angular/core'
import { AccountCreateEmailInput, Email } from '@case-clinical/mobile/core/data-access'
import { AccountEmailStore } from './account-email.store'

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
      <ng-container *ngIf="vm.emails">
        <div class="">
          <div class="">
            <div class="">Emails</div>
            <div class="">
              <account-email-list (deleteEmail)="deleteEmail($event)" [emails]="vm.emails"></account-email-list>
            </div>
          </div>
          <div class="">
            <div class="">Select Primary Email</div>
            <div class="">
              <account-email-primary-form
                [emails]="vm.emails"
                (send)="setPrimaryEmail($event)"
              ></account-email-primary-form>
            </div>
          </div>
          <div class="">
            <div class="">Add Email</div>
            <div class="">
              <account-email-form (send)="addEmail($event)"></account-email-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountEmailStore],
})
export class AccountEmailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountEmailStore) {}

  addEmail(email: AccountCreateEmailInput) {
    this.store.addEmail(email)
  }

  deleteEmail(email: Email) {
    if (!window.confirm('Are you sure?')) {
      return true
    }
    this.store.deleteEmail(email)
  }

  setPrimaryEmail(email: Email) {
    this.store.setPrimaryEmail(email)
  }

  ngOnInit(): void {
    this.store.loadEmailsEffect()
  }
}
