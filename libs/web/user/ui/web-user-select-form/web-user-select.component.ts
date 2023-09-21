

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-user-form
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [user]="context.value || {}"
      >
      </ui-user-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-user-select-table-view
        class="w-full h-full bg-white"
        [users]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-user-select-table-view>
    </ng-template>
  `,
})
export class WebUserSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(private store: WebUserFeatureStore) {
    super()
    this.store.loadUsersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.users$.pipe(
      switchMap((users) => {
        return of(users)
      }),
    )
  }
}

