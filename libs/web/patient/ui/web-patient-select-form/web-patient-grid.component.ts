

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
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
      <ui-patient-form
        class="flex-grow flex flex-col"
        [formName]="'patient_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patient]="context.value"
      >
      </ui-patient-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-form
        class="flex-grow flex flex-col"
        [formName]="'patient_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patient]="{}"
      >
      </ui-patient-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-patient-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [patients]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-patient-select-table-view>
    </ng-template>
  `,
})
export class WebPatientGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
