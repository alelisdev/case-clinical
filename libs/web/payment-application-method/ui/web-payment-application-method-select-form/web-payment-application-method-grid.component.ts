

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPaymentApplicationMethodFeatureStore } from '@case-clinical/web/payment-application-method/shared'
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
      <ui-payment-application-method-form
        class="flex-grow flex flex-col"
        [formName]="'paymentApplicationMethod_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentApplicationMethod]="context.value"
      >
      </ui-payment-application-method-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payment-application-method-form
        class="flex-grow flex flex-col"
        [formName]="'paymentApplicationMethod_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [paymentApplicationMethod]="{}"
      >
      </ui-payment-application-method-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-payment-application-method-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [paymentApplicationMethods]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-payment-application-method-select-table-view>
    </ng-template>
  `,
})
export class WebPaymentApplicationMethodGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
