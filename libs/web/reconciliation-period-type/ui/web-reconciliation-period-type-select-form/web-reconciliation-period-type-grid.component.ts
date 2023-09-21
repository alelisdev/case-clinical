

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-reconciliation-period-type-form
        class="flex-grow flex flex-col"
        [formName]="'reconciliationPeriodType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [reconciliationPeriodType]="context.value"
      >
      </ui-reconciliation-period-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-reconciliation-period-type-form
        class="flex-grow flex flex-col"
        [formName]="'reconciliationPeriodType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [reconciliationPeriodType]="{}"
      >
      </ui-reconciliation-period-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-reconciliation-period-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [reconciliationPeriodTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-reconciliation-period-type-select-table-view>
    </ng-template>
  `,
})
export class WebReconciliationPeriodTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
