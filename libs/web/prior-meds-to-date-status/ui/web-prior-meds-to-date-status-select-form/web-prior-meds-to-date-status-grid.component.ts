

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
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
      <ui-prior-meds-to-date-status-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDateStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDateStatus]="context.value"
      >
      </ui-prior-meds-to-date-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-meds-to-date-status-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDateStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDateStatus]="{}"
      >
      </ui-prior-meds-to-date-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-meds-to-date-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorMedsToDateStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-meds-to-date-status-select-table-view>
    </ng-template>
  `,
})
export class WebPriorMedsToDateStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
