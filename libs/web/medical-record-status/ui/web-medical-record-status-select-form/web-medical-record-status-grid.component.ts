

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalRecordStatusFeatureStore } from '@case-clinical/web/medical-record-status/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-medical-record-status-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecordStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecordStatus]="context.value"
      >
      </ui-medical-record-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-record-status-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecordStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecordStatus]="{}"
      >
      </ui-medical-record-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-medical-record-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [medicalRecordStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-medical-record-status-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalRecordStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
