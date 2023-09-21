

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractTermFeatureStore } from '@case-clinical/web/contract-term/shared'
import {ContractTerm} from '@case-clinical/web/core/data-access'


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
      <ui-contract-term-form
        class="flex-grow flex flex-col"
        [formName]="'contractTerm_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractTerm]="contractTerm"
      >
      >
      </ui-contract-term-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contract-term-form
        class="flex-grow flex flex-col"
        [formName]="'contractTerm_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractTerm]="{}"
      >
      </ui-contract-term-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contract-term-select-table-view
        class="w-full h-full bg-white"
        [contractTerms]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contract-term-select-table-view>
    </ng-template>
  `,
})
export class WebContractTermSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contractTerm: ContractTerm

  constructor(private store: WebContractTermFeatureStore) {
    super()
    this.store.loadContractTermsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contractTerms$.pipe(
      switchMap((contractTerms) => {
        return of(contractTerms)
      }),
    )
  }
}

