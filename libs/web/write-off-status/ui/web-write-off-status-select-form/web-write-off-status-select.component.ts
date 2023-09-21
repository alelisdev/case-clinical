

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebWriteOffStatusFeatureStore } from '@case-clinical/web/write-off-status/shared'
import {WriteOffStatus} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-write-off-status-form
        class="flex-grow flex flex-col"
        [formName]="'writeOffStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOffStatus]="writeOffStatus"
      >
      >
      </ui-write-off-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-write-off-status-form
        class="flex-grow flex flex-col"
        [formName]="'writeOffStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOffStatus]="{}"
      >
      </ui-write-off-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-write-off-status-select-table-view
        class="w-full h-full bg-white"
        [writeOffStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-write-off-status-select-table-view>
    </ng-template>
  `,
})
export class WebWriteOffStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  writeOffStatus: WriteOffStatus

  constructor(private store: WebWriteOffStatusFeatureStore) {
    super()
    this.store.loadWriteOffStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.writeOffStatuses$.pipe(
      switchMap((writeOffStatuses) => {
        return of(writeOffStatuses)
      }),
    )
  }
}

