

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSeverityFeatureStore } from '@case-clinical/web/severity/shared'
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
      <ui-severity-form
        class="flex-grow flex flex-col"
        [formName]="'severity_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [severity]="context.value"
      >
      </ui-severity-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-severity-form
        class="flex-grow flex flex-col"
        [formName]="'severity_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [severity]="{}"
      >
      </ui-severity-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-severity-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [severities]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-severity-select-table-view>
    </ng-template>
  `,
})
export class WebSeverityGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
