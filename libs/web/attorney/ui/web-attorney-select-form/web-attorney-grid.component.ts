

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
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
      <ui-attorney-form
        class="flex-grow flex flex-col"
        [formName]="'attorney_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorney]="context.value"
      >
      </ui-attorney-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-form
        class="flex-grow flex flex-col"
        [formName]="'attorney_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorney]="{}"
      >
      </ui-attorney-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-attorney-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [attorneys]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-attorney-select-table-view>
    </ng-template>
  `,
})
export class WebAttorneyGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
