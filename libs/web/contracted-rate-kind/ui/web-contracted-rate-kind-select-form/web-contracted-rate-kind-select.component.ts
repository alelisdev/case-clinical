

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractedRateKindFeatureStore } from '@case-clinical/web/contracted-rate-kind/shared'
import {ContractedRateKind} from '@case-clinical/web/core/data-access'


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
      <ui-contracted-rate-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRateKind_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRateKind]="contractedRateKind"
      >
      >
      </ui-contracted-rate-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contracted-rate-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRateKind_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRateKind]="{}"
      >
      </ui-contracted-rate-kind-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-contracted-rate-kind-select-table-view
        class="w-full h-full bg-white"
        [contractedRateKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-contracted-rate-kind-select-table-view>
    </ng-template>
  `,
})
export class WebContractedRateKindSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  contractedRateKind: ContractedRateKind

  constructor(private store: WebContractedRateKindFeatureStore) {
    super()
    this.store.loadContractedRateKindsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.contractedRateKinds$.pipe(
      switchMap((contractedRateKinds) => {
        return of(contractedRateKinds)
      }),
    )
  }
}

