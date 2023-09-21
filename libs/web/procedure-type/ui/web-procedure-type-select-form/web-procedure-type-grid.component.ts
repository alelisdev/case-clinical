

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
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
      <ui-procedure-type-form
        class="flex-grow flex flex-col"
        [formName]="'procedureType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureType]="context.value"
      >
      </ui-procedure-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-type-form
        class="flex-grow flex flex-col"
        [formName]="'procedureType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureType]="{}"
      >
      </ui-procedure-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-procedure-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [procedureTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-procedure-type-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
