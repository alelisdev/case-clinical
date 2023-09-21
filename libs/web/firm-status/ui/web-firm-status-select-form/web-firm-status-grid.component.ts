

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFirmStatusFeatureStore } from '@case-clinical/web/firm-status/shared'
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
      <ui-firm-status-form
        class="flex-grow flex flex-col"
        [formName]="'firmStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firmStatus]="context.value"
      >
      </ui-firm-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-firm-status-form
        class="flex-grow flex flex-col"
        [formName]="'firmStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firmStatus]="{}"
      >
      </ui-firm-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-firm-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [firmStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-firm-status-select-table-view>
    </ng-template>
  `,
})
export class WebFirmStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
