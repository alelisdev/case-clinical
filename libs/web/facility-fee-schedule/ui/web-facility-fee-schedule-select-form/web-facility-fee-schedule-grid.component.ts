

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFacilityFeeScheduleFeatureStore } from '@case-clinical/web/facility-fee-schedule/shared'
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
      <ui-facility-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'facilityFeeSchedule_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [facilityFeeSchedule]="context.value"
      >
      </ui-facility-fee-schedule-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-facility-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'facilityFeeSchedule_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [facilityFeeSchedule]="{}"
      >
      </ui-facility-fee-schedule-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-facility-fee-schedule-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [facilityFeeSchedules]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-facility-fee-schedule-select-table-view>
    </ng-template>
  `,
})
export class WebFacilityFeeScheduleGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
