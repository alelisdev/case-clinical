

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import {ReconciliationPeriodType} from '@case-clinical/web/core/data-access'


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
      <ui-reconciliation-period-type-form
        class="flex-grow flex flex-col"
        [formName]="'reconciliationPeriodType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [reconciliationPeriodType]="reconciliationPeriodType"
      >
      >
      </ui-reconciliation-period-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-reconciliation-period-type-form
        class="flex-grow flex flex-col"
        [formName]="'reconciliationPeriodType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [reconciliationPeriodType]="{}"
      >
      </ui-reconciliation-period-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-reconciliation-period-type-select-table-view
        class="w-full h-full bg-white"
        [reconciliationPeriodTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-reconciliation-period-type-select-table-view>
    </ng-template>
  `,
})
export class WebReconciliationPeriodTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  reconciliationPeriodType: ReconciliationPeriodType

  constructor(private store: WebReconciliationPeriodTypeFeatureStore) {
    super()
    this.store.loadReconciliationPeriodTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.reconciliationPeriodTypes$.pipe(
      switchMap((reconciliationPeriodTypes) => {
        return of(reconciliationPeriodTypes)
      }),
    )
  }
}

