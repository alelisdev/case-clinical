

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import {MedicalRecord} from '@case-clinical/web/core/data-access'


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
      <ui-medical-record-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecord_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecord]="medicalRecord"
      >
      >
      </ui-medical-record-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-record-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecord_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecord]="{}"
      >
      </ui-medical-record-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-medical-record-select-table-view
        class="w-full h-full bg-white"
        [medicalRecords]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-medical-record-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalRecordSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  medicalRecord: MedicalRecord

  constructor(private store: WebMedicalRecordFeatureStore) {
    super()
    this.store.loadMedicalRecordsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.medicalRecords$.pipe(
      switchMap((medicalRecords) => {
        return of(medicalRecords)
      }),
    )
  }
}

