

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
import {PatientTreatmentStatus} from '@case-clinical/web/core/data-access'


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
      <ui-patient-treatment-status-form
        class="flex-grow flex flex-col"
        [formName]="'patientTreatmentStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientTreatmentStatus]="patientTreatmentStatus"
      >
      >
      </ui-patient-treatment-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-treatment-status-form
        class="flex-grow flex flex-col"
        [formName]="'patientTreatmentStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientTreatmentStatus]="{}"
      >
      </ui-patient-treatment-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-patient-treatment-status-select-table-view
        class="w-full h-full bg-white"
        [patientTreatmentStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-patient-treatment-status-select-table-view>
    </ng-template>
  `,
})
export class WebPatientTreatmentStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  patientTreatmentStatus: PatientTreatmentStatus

  constructor(private store: WebPatientTreatmentStatusFeatureStore) {
    super()
    this.store.loadPatientTreatmentStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.patientTreatmentStatuses$.pipe(
      switchMap((patientTreatmentStatuses) => {
        return of(patientTreatmentStatuses)
      }),
    )
  }
}

