

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadStatusFeatureStore } from '@case-clinical/web/lead-status/shared'
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
      <ui-lead-status-form
        class="flex-grow flex flex-col"
        [formName]="'leadStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadStatus]="context.value"
      >
      </ui-lead-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-status-form
        class="flex-grow flex flex-col"
        [formName]="'leadStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadStatus]="{}"
      >
      </ui-lead-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leadStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-status-select-table-view>
    </ng-template>
  `,
})
export class WebLeadStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
