

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-invoice-detail-form
        class="flex-grow flex flex-col"
        [formName]="'invoiceDetail_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoiceDetail]="context.value"
      >
      </ui-invoice-detail-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-invoice-detail-form
        class="flex-grow flex flex-col"
        [formName]="'invoiceDetail_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoiceDetail]="{}"
      >
      </ui-invoice-detail-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-invoice-detail-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [invoiceDetails]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-invoice-detail-select-table-view>
    </ng-template>
  `,
})
export class WebInvoiceDetailGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
