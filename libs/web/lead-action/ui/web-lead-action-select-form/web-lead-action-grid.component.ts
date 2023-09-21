

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadActionFeatureStore } from '@case-clinical/web/lead-action/shared'
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
      <ui-lead-action-form
        class="flex-grow flex flex-col"
        [formName]="'leadAction_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadAction]="context.value"
      >
      </ui-lead-action-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-action-form
        class="flex-grow flex flex-col"
        [formName]="'leadAction_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadAction]="{}"
      >
      </ui-lead-action-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-action-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leadActions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-action-select-table-view>
    </ng-template>
  `,
})
export class WebLeadActionGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
