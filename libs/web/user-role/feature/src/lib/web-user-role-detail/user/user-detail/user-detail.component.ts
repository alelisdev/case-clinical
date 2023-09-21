
import { Component } from '@angular/core'
import { UserDetailStore } from './user-detail.store'

@Component({
  templateUrl: `./user-detail.component.html`,
  providers: [UserDetailStore],
})
export class UserDetailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: UserDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteUserEffect(item)
    }
  }
}

