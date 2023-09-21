

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
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
      <ui-ethnicity-form
        class="flex-grow flex flex-col"
        [formName]="'ethnicity_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [ethnicity]="context.value"
      >
      </ui-ethnicity-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-ethnicity-form
        class="flex-grow flex flex-col"
        [formName]="'ethnicity_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [ethnicity]="{}"
      >
      </ui-ethnicity-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-ethnicity-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [ethnicities]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-ethnicity-select-table-view>
    </ng-template>
  `,
})
export class WebEthnicityGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
