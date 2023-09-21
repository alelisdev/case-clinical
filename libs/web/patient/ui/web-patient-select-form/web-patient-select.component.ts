

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import {Patient} from '@case-clinical/web/core/data-access'


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
      <ui-patient-form
        class="flex-grow flex flex-col"
        [formName]="'patient_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patient]="patient"
      >
      >
      </ui-patient-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-form
        class="flex-grow flex flex-col"
        [formName]="'patient_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patient]="{}"
      >
      </ui-patient-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-patient-select-table-view
        class="w-full h-full bg-white"
        [patients]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-patient-select-table-view>
    </ng-template>
  `,
})
export class WebPatientSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  patient: Patient

  constructor(private store: WebPatientFeatureStore) {
    super()
    this.store.loadPatientsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.patients$.pipe(
      switchMap((patients) => {
        return of(patients)
      }),
    )
  }
}

