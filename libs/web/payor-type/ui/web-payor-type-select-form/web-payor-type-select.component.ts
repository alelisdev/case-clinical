

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPayorTypeFeatureStore } from '@case-clinical/web/payor-type/shared'
import {PayorType} from '@case-clinical/web/core/data-access'


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
      <ui-payor-type-form
        class="flex-grow flex flex-col"
        [formName]="'payorType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payorType]="payorType"
      >
      >
      </ui-payor-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-payor-type-form
        class="flex-grow flex flex-col"
        [formName]="'payorType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [payorType]="{}"
      >
      </ui-payor-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-payor-type-select-table-view
        class="w-full h-full bg-white"
        [payorTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-payor-type-select-table-view>
    </ng-template>
  `,
})
export class WebPayorTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  payorType: PayorType

  constructor(private store: WebPayorTypeFeatureStore) {
    super()
    this.store.loadPayorTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.payorTypes$.pipe(
      switchMap((payorTypes) => {
        return of(payorTypes)
      }),
    )
  }
}

