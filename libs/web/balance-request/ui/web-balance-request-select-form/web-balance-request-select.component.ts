

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBalanceRequestFeatureStore } from '@case-clinical/web/balance-request/shared'
import {BalanceRequest} from '@case-clinical/web/core/data-access'


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
      <ui-balance-request-form
        class="flex-grow flex flex-col"
        [formName]="'balanceRequest_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [balanceRequest]="balanceRequest"
      >
      >
      </ui-balance-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-balance-request-form
        class="flex-grow flex flex-col"
        [formName]="'balanceRequest_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [balanceRequest]="{}"
      >
      </ui-balance-request-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-balance-request-select-table-view
        class="w-full h-full bg-white"
        [balanceRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-balance-request-select-table-view>
    </ng-template>
  `,
})
export class WebBalanceRequestSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  balanceRequest: BalanceRequest

  constructor(private store: WebBalanceRequestFeatureStore) {
    super()
    this.store.loadBalanceRequestsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.balanceRequests$.pipe(
      switchMap((balanceRequests) => {
        return of(balanceRequests)
      }),
    )
  }
}

