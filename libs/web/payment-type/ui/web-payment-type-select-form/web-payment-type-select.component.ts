

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPaymentTypeFeatureStore } from '@case-clinical/web/payment-type/shared'
import {PaymentType} from '@case-clinical/web/core/data-access'


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
      <ui-payment-type-form
        class="flex-grow flex flex-col"
        [formName]="'paymentType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentType]="paymentType"
      >
      >
      </ui-payment-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payment-type-form
        class="flex-grow flex flex-col"
        [formName]="'paymentType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentType]="{}"
      >
      </ui-payment-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-payment-type-select-table-view
        class="w-full h-full bg-white"
        [paymentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-payment-type-select-table-view>
    </ng-template>
  `,
})
export class WebPaymentTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  paymentType: PaymentType

  constructor(private store: WebPaymentTypeFeatureStore) {
    super()
    this.store.loadPaymentTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.paymentTypes$.pipe(
      switchMap((paymentTypes) => {
        return of(paymentTypes)
      }),
    )
  }
}

