

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
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
      <ui-accident-type-form
        class="flex-grow flex flex-col"
        [formName]="'accidentType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accidentType]="context.value"
      >
      </ui-accident-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-accident-type-form
        class="flex-grow flex flex-col"
        [formName]="'accidentType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accidentType]="{}"
      >
      </ui-accident-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-accident-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [accidentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-accident-type-select-table-view>
    </ng-template>
  `,
})
export class WebAccidentTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
