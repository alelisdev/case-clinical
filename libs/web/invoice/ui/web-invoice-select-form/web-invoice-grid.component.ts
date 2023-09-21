

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'
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
      <ui-invoice-form
        class="flex-grow flex flex-col"
        [formName]="'invoice_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoice]="context.value"
      >
      </ui-invoice-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-invoice-form
        class="flex-grow flex flex-col"
        [formName]="'invoice_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoice]="{}"
      >
      </ui-invoice-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-invoice-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [invoices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-invoice-select-table-view>
    </ng-template>
  `,
})
export class WebInvoiceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
