

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcessFeatureStore } from '@case-clinical/web/process/shared'
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
      <ui-process-form
        class="flex-grow flex flex-col"
        [formName]="'process_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [process]="context.value"
      >
      </ui-process-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-process-form
        class="flex-grow flex flex-col"
        [formName]="'process_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [process]="{}"
      >
      </ui-process-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-process-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [processes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-process-select-table-view>
    </ng-template>
  `,
})
export class WebProcessGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
