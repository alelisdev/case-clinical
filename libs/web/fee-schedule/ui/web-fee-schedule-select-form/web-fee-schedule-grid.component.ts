

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFeeScheduleFeatureStore } from '@case-clinical/web/fee-schedule/shared'
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
      <ui-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'feeSchedule_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [feeSchedule]="context.value"
      >
      </ui-fee-schedule-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'feeSchedule_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [feeSchedule]="{}"
      >
      </ui-fee-schedule-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-fee-schedule-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [feeSchedules]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-fee-schedule-select-table-view>
    </ng-template>
  `,
})
export class WebFeeScheduleGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
