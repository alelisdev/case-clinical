

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseTypeFeatureStore } from '@case-clinical/web/case-type/shared'
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
      <ui-case-type-form
        class="flex-grow flex flex-col"
        [formName]="'caseType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseType]="context.value"
      >
      </ui-case-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-type-form
        class="flex-grow flex flex-col"
        [formName]="'caseType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseType]="{}"
      >
      </ui-case-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [caseTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-type-select-table-view>
    </ng-template>
  `,
})
export class WebCaseTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
