

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPatientStudyFeatureStore } from '@case-clinical/web/patient-study/shared'
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
      <ui-patient-study-form
        class="flex-grow flex flex-col"
        [formName]="'patientStudy_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientStudy]="context.value"
      >
      </ui-patient-study-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-patient-study-form
        class="flex-grow flex flex-col"
        [formName]="'patientStudy_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [patientStudy]="{}"
      >
      </ui-patient-study-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-patient-study-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [patientStudies]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-patient-study-select-table-view>
    </ng-template>
  `,
})
export class WebPatientStudyGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
