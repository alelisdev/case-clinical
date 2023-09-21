import { Component, OnInit } from '@angular/core'
import { AccountUpdateProfileInput } from '@case-clinical/web/core/data-access'
import { AccountProfileStore } from './account-profile.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.loading">
        <div class="flex py-4 justify-center items-center shadow rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 md:mb-6">
          <ui-loader></ui-loader>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.errors">
        <div class="p-4 shadow rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 md:mb-6">
          <div class="font-semibold">An error occurred:</div>
          <pre class="text-red-700">{{ vm.errors }}</pre>
        </div>
      </ng-container>
      <ng-container *ngIf="vm.profile">
        <div class="flex flex-col space-y-6 md:space-y-12">
          <account-profile-form [user]="vm.profile" (send)="updateProfile($event)"></account-profile-form>
          <account-username-form [user]="vm.profile" (send)="updateUsername($event)"></account-username-form>
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
