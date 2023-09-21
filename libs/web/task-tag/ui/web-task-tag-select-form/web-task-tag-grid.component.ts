

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTaskTagFeatureStore } from '@case-clinical/web/task-tag/shared'
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
      <ui-task-tag-form
        class="flex-grow flex flex-col"
        [formName]="'taskTag_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskTag]="context.value"
      >
      </ui-task-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-task-tag-form
        class="flex-grow flex flex-col"
        [formName]="'taskTag_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskTag]="{}"
      >
      </ui-task-tag-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-task-tag-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [taskTags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-task-tag-select-table-view>
    </ng-template>
  `,
})
export class WebTaskTagGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
