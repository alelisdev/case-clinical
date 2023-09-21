

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import {InvoiceDetail} from '@case-clinical/web/core/data-access'


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
      <ui-invoice-detail-form
        class="flex-grow flex flex-col"
        [formName]="'invoiceDetail_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoiceDetail]="invoiceDetail"
      >
      >
      </ui-invoice-detail-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-invoice-detail-form
        class="flex-grow flex flex-col"
        [formName]="'invoiceDetail_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [invoiceDetail]="{}"
      >
      </ui-invoice-detail-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-invoice-detail-select-table-view
        class="w-full h-full bg-white"
        [invoiceDetails]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-invoice-detail-select-table-view>
    </ng-template>
  `,
})
export class WebInvoiceDetailSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  invoiceDetail: InvoiceDetail

  constructor(private store: WebInvoiceDetailFeatureStore) {
    super()
    this.store.loadInvoiceDetailsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.invoiceDetails$.pipe(
      switchMap((invoiceDetails) => {
        return of(invoiceDetails)
      }),
    )
  }
}

