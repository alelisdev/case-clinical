

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientStudyFeatureStore } from '@case-clinical/web/patient-study/shared'
import {PatientStudy} from '@case-clinical/web/core/data-access'


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
      <ui-patient-study-form
        class="flex-grow flex flex-col"
        [formName]="'patientStudy_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientStudy]="patientStudy"
      >
      >
      </ui-patient-study-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-study-form
        class="flex-grow flex flex-col"
        [formName]="'patientStudy_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientStudy]="{}"
      >
      </ui-patient-study-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-patient-study-select-table-view
        class="w-full h-full bg-white"
        [patientStudies]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-patient-study-select-table-view>
    </ng-template>
  `,
})
export class WebPatientStudySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  patientStudy: PatientStudy

  constructor(private store: WebPatientStudyFeatureStore) {
    super()
    this.store.loadPatientStudiesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.patientStudies$.pipe(
      switchMap((patientStudies) => {
        return of(patientStudies)
      }),
    )
  }
}

