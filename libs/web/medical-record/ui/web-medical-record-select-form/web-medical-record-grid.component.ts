

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-medical-record-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecord_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecord]="context.value"
      >
      </ui-medical-record-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-record-form
        class="flex-grow flex flex-col"
        [formName]="'medicalRecord_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalRecord]="{}"
      >
      </ui-medical-record-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-medical-record-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [medicalRecords]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-medical-record-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalRecordGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
