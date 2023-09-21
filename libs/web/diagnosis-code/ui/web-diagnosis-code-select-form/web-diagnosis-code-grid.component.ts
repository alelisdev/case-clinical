

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
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
      <ui-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'diagnosisCode_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [diagnosisCode]="context.value"
      >
      </ui-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'diagnosisCode_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [diagnosisCode]="{}"
      >
      </ui-diagnosis-code-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-diagnosis-code-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [diagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-diagnosis-code-select-table-view>
    </ng-template>
  `,
})
export class WebDiagnosisCodeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
