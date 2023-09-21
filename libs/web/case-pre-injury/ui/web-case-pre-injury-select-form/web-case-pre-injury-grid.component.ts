

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCasePreInjuryFeatureStore } from '@case-clinical/web/case-pre-injury/shared'
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
      <ui-case-pre-injury-form
        class="flex-grow flex flex-col"
        [formName]="'casePreInjury_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreInjury]="context.value"
      >
      </ui-case-pre-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-pre-injury-form
        class="flex-grow flex flex-col"
        [formName]="'casePreInjury_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [casePreInjury]="{}"
      >
      </ui-case-pre-injury-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-pre-injury-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [casePreInjuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-pre-injury-select-table-view>
    </ng-template>
  `,
})
export class WebCasePreInjuryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
