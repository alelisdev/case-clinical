

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import {Appointment} from '@case-clinical/web/core/data-access'


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
      <ui-appointment-form
        class="flex-grow flex flex-col"
        [formName]="'appointment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointment]="appointment"
      >
      >
      </ui-appointment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-appointment-form
        class="flex-grow flex flex-col"
        [formName]="'appointment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointment]="{}"
      >
      </ui-appointment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-appointment-select-table-view
        class="w-full h-full bg-white"
        [appointments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-appointment-select-table-view>
    </ng-template>
  `,
})
export class WebAppointmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  appointment: Appointment

  constructor(private store: WebAppointmentFeatureStore) {
    super()
    this.store.loadAppointmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.appointments$.pipe(
      switchMap((appointments) => {
        return of(appointments)
      }),
    )
  }
}

