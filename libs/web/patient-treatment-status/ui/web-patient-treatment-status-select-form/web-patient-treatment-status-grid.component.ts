

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
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
      <ui-patient-treatment-status-form
        class="flex-grow flex flex-col"
        [formName]="'patientTreatmentStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientTreatmentStatus]="context.value"
      >
      </ui-patient-treatment-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-treatment-status-form
        class="flex-grow flex flex-col"
        [formName]="'patientTreatmentStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientTreatmentStatus]="{}"
      >
      </ui-patient-treatment-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-patient-treatment-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [patientTreatmentStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-patient-treatment-status-select-table-view>
    </ng-template>
  `,
})
export class WebPatientTreatmentStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
