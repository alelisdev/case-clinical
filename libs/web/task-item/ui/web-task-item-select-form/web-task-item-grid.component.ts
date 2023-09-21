

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTaskItemFeatureStore } from '@case-clinical/web/task-item/shared'
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
      <ui-task-item-form
        class="flex-grow flex flex-col"
        [formName]="'taskItem_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskItem]="context.value"
      >
      </ui-task-item-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-task-item-form
        class="flex-grow flex flex-col"
        [formName]="'taskItem_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskItem]="{}"
      >
      </ui-task-item-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-task-item-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [taskItems]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-task-item-select-table-view>
    </ng-template>
  `,
})
export class WebTaskItemGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
