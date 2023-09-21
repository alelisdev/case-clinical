

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBatchControlFeatureStore } from '@case-clinical/web/batch-control/shared'
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
      <ui-batch-control-form
        class="flex-grow flex flex-col"
        [formName]="'batchControl_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [batchControl]="context.value"
      >
      </ui-batch-control-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-batch-control-form
        class="flex-grow flex flex-col"
        [formName]="'batchControl_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [batchControl]="{}"
      >
      </ui-batch-control-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-batch-control-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [batchControls]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-batch-control-select-table-view>
    </ng-template>
  `,
})
export class WebBatchControlGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
