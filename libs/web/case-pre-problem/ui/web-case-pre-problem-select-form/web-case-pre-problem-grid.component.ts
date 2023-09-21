

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCasePreProblemFeatureStore } from '@case-clinical/web/case-pre-problem/shared'
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
      <ui-case-pre-problem-form
        class="flex-grow flex flex-col"
        [formName]="'casePreProblem_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreProblem]="context.value"
      >
      </ui-case-pre-problem-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-pre-problem-form
        class="flex-grow flex flex-col"
        [formName]="'casePreProblem_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreProblem]="{}"
      >
      </ui-case-pre-problem-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-pre-problem-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [casePreProblems]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-pre-problem-select-table-view>
    </ng-template>
  `,
})
export class WebCasePreProblemGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
