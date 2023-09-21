

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseAccountPaymentFeatureStore } from '@case-clinical/web/case-account-payment/shared'
import {CaseAccountPayment} from '@case-clinical/web/core/data-access'


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
      <ui-case-account-payment-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccountPayment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccountPayment]="caseAccountPayment"
      >
      >
      </ui-case-account-payment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-account-payment-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccountPayment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccountPayment]="{}"
      >
      </ui-case-account-payment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-account-payment-select-table-view
        class="w-full h-full bg-white"
        [caseAccountPayments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-account-payment-select-table-view>
    </ng-template>
  `,
})
export class WebCaseAccountPaymentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  caseAccountPayment: CaseAccountPayment

  constructor(private store: WebCaseAccountPaymentFeatureStore) {
    super()
    this.store.loadCaseAccountPaymentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.caseAccountPayments$.pipe(
      switchMap((caseAccountPayments) => {
        return of(caseAccountPayments)
      }),
    )
  }
}

