

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorMedsToDateFeatureStore } from '@case-clinical/web/prior-meds-to-date/shared'
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
      <ui-prior-meds-to-date-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDate_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDate]="context.value"
      >
      </ui-prior-meds-to-date-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-meds-to-date-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDate_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDate]="{}"
      >
      </ui-prior-meds-to-date-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-meds-to-date-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorMedsToDates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-meds-to-date-select-table-view>
    </ng-template>
  `,
})
export class WebPriorMedsToDateGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
