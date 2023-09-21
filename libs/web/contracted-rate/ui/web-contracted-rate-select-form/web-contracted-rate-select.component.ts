

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractedRateFeatureStore } from '@case-clinical/web/contracted-rate/shared'
import {ContractedRate} from '@case-clinical/web/core/data-access'


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
      <ui-contracted-rate-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRate_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRate]="contractedRate"
      >
      >
      </ui-contracted-rate-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contracted-rate-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRate_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRate]="{}"
      >
      </ui-contracted-rate-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contracted-rate-select-table-view
        class="w-full h-full bg-white"
        [contractedRates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contracted-rate-select-table-view>
    </ng-template>
  `,
})
export class WebContractedRateSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contractedRate: ContractedRate

  constructor(private store: WebContractedRateFeatureStore) {
    super()
    this.store.loadContractedRatesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contractedRates$.pipe(
      switchMap((contractedRates) => {
        return of(contractedRates)
      }),
    )
  }
}

