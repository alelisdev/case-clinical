

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalRecordStatusFeatureStore } from '@case-clinical/web/medical-record-status/shared'
import {MedicalRecordStatus} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-medical-record-status-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecordStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecordStatus]="medicalRecordStatus"
      >
      >
      </ui-medical-record-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-record-status-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecordStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecordStatus]="{}"
      >
      </ui-medical-record-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-medical-record-status-select-table-view
        class="w-full h-full bg-white"
        [medicalRecordStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-medical-record-status-select-table-view>
    </ng-template>
  `,
    providers: [WebMedicalRecordStatusFeatureStore]
})
export class WebMedicalRecordStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  medicalRecordStatus: MedicalRecordStatus

  constructor(private store: WebMedicalRecordStatusFeatureStore) {
    super()
    this.store.loadMedicalRecordStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.medicalRecordStatuses$.pipe(
      switchMap((medicalRecordStatuses) => {
        return of(medicalRecordStatuses)
      }),
    )
  }
}

