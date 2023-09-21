

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFacilityFeeScheduleFeatureStore } from '@case-clinical/web/facility-fee-schedule/shared'
import {FacilityFeeSchedule} from '@case-clinical/web/core/data-access'


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
      <ui-facility-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'facilityFeeSchedule_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [facilityFeeSchedule]="facilityFeeSchedule"
      >
      >
      </ui-facility-fee-schedule-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-facility-fee-schedule-form
        class="flex-grow flex flex-col"
        [formName]="'facilityFeeSchedule_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [facilityFeeSchedule]="{}"
      >
      </ui-facility-fee-schedule-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-facility-fee-schedule-select-table-view
        class="w-full h-full bg-white"
        [facilityFeeSchedules]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-facility-fee-schedule-select-table-view>
    </ng-template>
  `,
})
export class WebFacilityFeeScheduleSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  facilityFeeSchedule: FacilityFeeSchedule

  constructor(private store: WebFacilityFeeScheduleFeatureStore) {
    super()
    this.store.loadFacilityFeeSchedulesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.facilityFeeSchedules$.pipe(
      switchMap((facilityFeeSchedules) => {
        return of(facilityFeeSchedules)
      }),
    )
  }
}

