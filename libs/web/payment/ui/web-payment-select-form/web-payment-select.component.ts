

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
import {Payment} from '@case-clinical/web/core/data-access'


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
      <ui-payment-form
        class="flex-grow flex flex-col"
        [formName]="'payment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payment]="payment"
      >
      >
      </ui-payment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payment-form
        class="flex-grow flex flex-col"
        [formName]="'payment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payment]="{}"
      >
      </ui-payment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-payment-select-table-view
        class="w-full h-full bg-white"
        [payments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-payment-select-table-view>
    </ng-template>
  `,
})
export class WebPaymentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  payment: Payment

  constructor(private store: WebPaymentFeatureStore) {
    super()
    this.store.loadPaymentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.payments$.pipe(
      switchMap((payments) => {
        return of(payments)
      }),
    )
  }
}

