

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBatchControlFeatureStore } from '@case-clinical/web/batch-control/shared'
import {BatchControl} from '@case-clinical/web/core/data-access'


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
      <ui-batch-control-form
        class="flex-grow flex flex-col"
        [formName]="'batchControl_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [batchControl]="batchControl"
      >
      >
      </ui-batch-control-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-batch-control-form
        class="flex-grow flex flex-col"
        [formName]="'batchControl_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [batchControl]="{}"
      >
      </ui-batch-control-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-batch-control-select-table-view
        class="w-full h-full bg-white"
        [batchControls]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-batch-control-select-table-view>
    </ng-template>
  `,
})
export class WebBatchControlSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  batchControl: BatchControl

  constructor(private store: WebBatchControlFeatureStore) {
    super()
    this.store.loadBatchControlsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.batchControls$.pipe(
      switchMap((batchControls) => {
        return of(batchControls)
      }),
    )
  }
}

