

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAttorneyStatusFeatureStore } from '@case-clinical/web/attorney-status/shared'
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
      <ui-attorney-status-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyStatus]="context.value"
      >
      </ui-attorney-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-status-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyStatus]="{}"
      >
      </ui-attorney-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-attorney-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [attorneyStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-attorney-status-select-table-view>
    </ng-template>
  `,
})
export class WebAttorneyStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
