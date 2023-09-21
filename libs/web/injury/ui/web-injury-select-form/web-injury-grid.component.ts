

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInjuryFeatureStore } from '@case-clinical/web/injury/shared'
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
      <ui-injury-form
        class="flex-grow flex flex-col"
        [formName]="'injury_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [injury]="context.value"
      >
      </ui-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-injury-form
        class="flex-grow flex flex-col"
        [formName]="'injury_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [injury]="{}"
      >
      </ui-injury-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-injury-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [injuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-injury-select-table-view>
    </ng-template>
  `,
})
export class WebInjuryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
