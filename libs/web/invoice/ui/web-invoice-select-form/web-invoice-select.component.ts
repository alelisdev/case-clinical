

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'
import {Invoice} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-invoice-form
        class="flex-grow flex flex-col"
        [formName]="'invoice_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoice]="invoice"
      >
      >
      </ui-invoice-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-invoice-form
        class="flex-grow flex flex-col"
        [formName]="'invoice_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoice]="{}"
      >
      </ui-invoice-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-invoice-select-table-view
        class="w-full h-full bg-white"
        [invoices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-invoice-select-table-view>
    </ng-template>
  `,
})
export class WebInvoiceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  invoice: Invoice

  constructor(private store: WebInvoiceFeatureStore) {
    super()
    this.store.loadInvoicesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.invoices$.pipe(
      switchMap((invoices) => {
        return of(invoices)
      }),
    )
  }
}

