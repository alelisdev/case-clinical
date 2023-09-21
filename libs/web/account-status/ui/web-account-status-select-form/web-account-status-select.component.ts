

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAccountStatusFeatureStore } from '@case-clinical/web/account-status/shared'
import {AccountStatus} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-account-status-form
        class="flex-grow flex flex-col"
        [formName]="'accountStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accountStatus]="accountStatus"
      >
      >
      </ui-account-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-account-status-form
        class="flex-grow flex flex-col"
        [formName]="'accountStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accountStatus]="{}"
      >
      </ui-account-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-account-status-select-table-view
        class="w-full h-full bg-white"
        [accountStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-account-status-select-table-view>
    </ng-template>
  `,
})
export class WebAccountStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  accountStatus: AccountStatus

  constructor(private store: WebAccountStatusFeatureStore) {
    super()
    this.store.loadAccountStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.accountStatuses$.pipe(
      switchMap((accountStatuses) => {
        return of(accountStatuses)
      }),
    )
  }
}
