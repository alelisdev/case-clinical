

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFeeScheduleFeatureStore } from '@case-clinical/web/fee-schedule/shared'
import {FeeSchedule} from '@case-clinical/web/core/data-access'


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
      <ui-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'feeSchedule_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [feeSchedule]="feeSchedule"
      >
      >
      </ui-fee-schedule-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'feeSchedule_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [feeSchedule]="{}"
      >
      </ui-fee-schedule-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-fee-schedule-select-table-view
        class="w-full h-full bg-white"
        [feeSchedules]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-fee-schedule-select-table-view>
    </ng-template>
  `,
})
export class WebFeeScheduleSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  feeSchedule: FeeSchedule

  constructor(private store: WebFeeScheduleFeatureStore) {
    super()
    this.store.loadFeeSchedulesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.feeSchedules$.pipe(
      switchMap((feeSchedules) => {
        return of(feeSchedules)
      }),
    )
  }
}

