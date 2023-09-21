

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTaskTagFeatureStore } from '@case-clinical/web/task-tag/shared'
import {TaskTag} from '@case-clinical/web/core/data-access'


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
      <ui-task-tag-form
        class="flex-grow flex flex-col"
        [formName]="'taskTag_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskTag]="taskTag"
      >
      >
      </ui-task-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-task-tag-form
        class="flex-grow flex flex-col"
        [formName]="'taskTag_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [taskTag]="{}"
      >
      </ui-task-tag-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-task-tag-select-table-view
        class="w-full h-full bg-white"
        [taskTags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-task-tag-select-table-view>
    </ng-template>
  `,
    providers: [WebTaskTagFeatureStore]
})
export class WebTaskTagSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  taskTag: TaskTag

  constructor(private store: WebTaskTagFeatureStore) {
    super()
    this.store.loadTaskTagsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.taskTags$.pipe(
      switchMap((taskTags) => {
        return of(taskTags)
      }),
    )
  }
}

