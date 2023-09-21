

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import {Contract} from '@case-clinical/web/core/data-access'


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
      <ui-contract-form
        class="flex-grow flex flex-col"
        [formName]="'contract_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contract]="contract"
      >
      >
      </ui-contract-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contract-form
        class="flex-grow flex flex-col"
        [formName]="'contract_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contract]="{}"
      >
      </ui-contract-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contract-select-table-view
        class="w-full h-full bg-white"
        [contracts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contract-select-table-view>
    </ng-template>
  `,
})
export class WebContractSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contract: Contract

  constructor(private store: WebContractFeatureStore) {
    super()
    this.store.loadContractsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contracts$.pipe(
      switchMap((contracts) => {
        return of(contracts)
      }),
    )
  }
}

