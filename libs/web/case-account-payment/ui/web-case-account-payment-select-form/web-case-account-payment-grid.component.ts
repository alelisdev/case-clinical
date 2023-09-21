

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseAccountPaymentFeatureStore } from '@case-clinical/web/case-account-payment/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-case-account-payment-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccountPayment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccountPayment]="context.value"
      >
      </ui-case-account-payment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-account-payment-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccountPayment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccountPayment]="{}"
      >
      </ui-case-account-payment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-account-payment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [caseAccountPayments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-account-payment-select-table-view>
    </ng-template>
  `,
})
export class WebCaseAccountPaymentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
