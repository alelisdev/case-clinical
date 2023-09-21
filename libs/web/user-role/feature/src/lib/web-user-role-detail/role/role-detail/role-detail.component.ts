
import { Component } from '@angular/core'
import { RoleDetailStore } from './role-detail.store'

@Component({
  templateUrl: `./role-detail.component.html`,
  providers: [RoleDetailStore],
})
export class RoleDetailComponent {
  readonly vm$ = this.store.vm$

  constructor(private readonly store: RoleDetailStore) {}

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteRoleEffect(item)
    }
  }
}

