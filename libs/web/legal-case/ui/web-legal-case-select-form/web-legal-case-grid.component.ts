

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
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
      <ui-legal-case-form
        class="flex-grow flex flex-col"
        [formName]="'legalCase_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [legalCase]="context.value"
      >
      </ui-legal-case-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-legal-case-form
        class="flex-grow flex flex-col"
        [formName]="'legalCase_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [legalCase]="{}"
      >
      </ui-legal-case-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-legal-case-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [legalCases]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-legal-case-select-table-view>
    </ng-template>
  `,
})
export class WebLegalCaseGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
