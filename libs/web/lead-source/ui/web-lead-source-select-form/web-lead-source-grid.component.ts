

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadSourceFeatureStore } from '@case-clinical/web/lead-source/shared'
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
      <ui-lead-source-form
        class="flex-grow flex flex-col"
        [formName]="'leadSource_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadSource]="context.value"
      >
      </ui-lead-source-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-source-form
        class="flex-grow flex flex-col"
        [formName]="'leadSource_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadSource]="{}"
      >
      </ui-lead-source-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-source-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leadSources]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-source-select-table-view>
    </ng-template>
  `,
})
export class WebLeadSourceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
