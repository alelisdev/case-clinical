

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTaskItemFeatureStore } from '@case-clinical/web/task-item/shared'
import {TaskItem} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-task-item-form
        class="flex-grow flex flex-col"
        [formName]="'taskItem_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskItem]="taskItem"
      >
      >
      </ui-task-item-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-task-item-form
        class="flex-grow flex flex-col"
        [formName]="'taskItem_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskItem]="{}"
      >
      </ui-task-item-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-task-item-select-table-view
        class="w-full h-full bg-white"
        [taskItems]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-task-item-select-table-view>
    </ng-template>
  `,
    providers: [WebTaskItemFeatureStore]
})
export class WebTaskItemSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  taskItem: TaskItem

  constructor(private store: WebTaskItemFeatureStore) {
    super()
    this.store.loadTaskItemsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.taskItems$.pipe(
      switchMap((taskItems) => {
        return of(taskItems)
      }),
    )
  }
}

