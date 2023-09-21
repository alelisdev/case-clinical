

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
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
      <ui-lead-form
        class="flex-grow flex flex-col"
        [formName]="'lead_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [lead]="context.value"
      >
      </ui-lead-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-form
        class="flex-grow flex flex-col"
        [formName]="'lead_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [lead]="{}"
      >
      </ui-lead-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leads]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-select-table-view>
    </ng-template>
  `,
})
export class WebLeadGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
