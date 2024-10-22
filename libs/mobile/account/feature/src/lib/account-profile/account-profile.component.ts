import { Component, OnInit } from '@angular/core'
import { AccountUpdateProfileInput } from '@case-clinical/mobile/core/data-access'
import { AccountProfileStore } from './account-profile.store'

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
      <ng-container *ngIf="vm.profile">
        <div class="">
          <div class="">
            <div class="">Profile</div>
            <div class="">
              <account-profile-form [user]="vm.profile" (send)="updateProfile($event)"></account-profile-form>
            </div>
          </div>
          <div class="">
            <div class="">Username</div>
            <div class="">
              <account-username-form [user]="vm.profile" (send)="updateUsername($event)"></account-username-form>
            </div>
          </div>
        </div>
      </ng-container>
    </ng-container>
  `,
  providers: [AccountProfileStore],
})
export class AccountProfileComponent implements OnInit {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: AccountProfileStore) {}

  updateProfile(input: AccountUpdateProfileInput) {
    this.store.updateProfileEffect(input)
  }

  updateUsername({ username }) {
    this.store.updateUsernameEffect(username)
  }

  ngOnInit(): void {
    this.store.loadProfileEffect()
  }
}
