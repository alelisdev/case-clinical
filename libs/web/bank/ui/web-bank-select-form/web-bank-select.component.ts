

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBankFeatureStore } from '@case-clinical/web/bank/shared'
import {Bank} from '@case-clinical/web/core/data-access'


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
      <ui-bank-form
        class="flex-grow flex flex-col"
        [formName]="'bank_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bank]="bank"
      >
      >
      </ui-bank-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-bank-form
        class="flex-grow flex flex-col"
        [formName]="'bank_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bank]="{}"
      >
      </ui-bank-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-bank-select-table-view
        class="w-full h-full bg-white"
        [banks]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-bank-select-table-view>
    </ng-template>
  `,
})
export class WebBankSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  bank: Bank

  constructor(private store: WebBankFeatureStore) {
    super()
    this.store.loadBanksEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.banks$.pipe(
      switchMap((banks) => {
        return of(banks)
      }),
    )
  }
}

