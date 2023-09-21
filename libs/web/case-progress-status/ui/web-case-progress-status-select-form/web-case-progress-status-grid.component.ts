

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseProgressStatusFeatureStore } from '@case-clinical/web/case-progress-status/shared'
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
      <ui-case-progress-status-form
        class="flex-grow flex flex-col"
        [formName]="'caseProgressStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProgressStatus]="context.value"
      >
      </ui-case-progress-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-progress-status-form
        class="flex-grow flex flex-col"
        [formName]="'caseProgressStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProgressStatus]="{}"
      >
      </ui-case-progress-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-progress-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [caseProgressStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-progress-status-select-table-view>
    </ng-template>
  `,
})
export class WebCaseProgressStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
