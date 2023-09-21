

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
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
      <ui-payment-form
        class="flex-grow flex flex-col"
        [formName]="'payment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payment]="context.value"
      >
      </ui-payment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payment-form
        class="flex-grow flex flex-col"
        [formName]="'payment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payment]="{}"
      >
      </ui-payment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-payment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [payments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-payment-select-table-view>
    </ng-template>
  `,
})
export class WebPaymentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
