

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
import {AppointmentStatus} from '@case-clinical/web/core/data-access'


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
      <ui-appointment-status-form
        class="flex-grow flex flex-col"
        [formName]="'appointmentStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointmentStatus]="appointmentStatus"
      >
      >
      </ui-appointment-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-appointment-status-form
        class="flex-grow flex flex-col"
        [formName]="'appointmentStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointmentStatus]="{}"
      >
      </ui-appointment-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-appointment-status-select-table-view
        class="w-full h-full bg-white"
        [appointmentStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-appointment-status-select-table-view>
    </ng-template>
  `,
})
export class WebAppointmentStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  appointmentStatus: AppointmentStatus

  constructor(private store: WebAppointmentStatusFeatureStore) {
    super()
    this.store.loadAppointmentStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.appointmentStatuses$.pipe(
      switchMap((appointmentStatuses) => {
        return of(appointmentStatuses)
      }),
    )
  }
}

