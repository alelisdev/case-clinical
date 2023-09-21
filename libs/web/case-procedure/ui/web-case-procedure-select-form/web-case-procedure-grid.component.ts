

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
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
      <ui-case-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'caseProcedure_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProcedure]="context.value"
      >
      </ui-case-procedure-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'caseProcedure_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProcedure]="{}"
      >
      </ui-case-procedure-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-procedure-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [caseProcedures]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-procedure-select-table-view>
    </ng-template>
  `,
})
export class WebCaseProcedureGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
