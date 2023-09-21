

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
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
      <ui-firm-form
        class="flex-grow flex flex-col"
        [formName]="'firm_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firm]="context.value"
      >
      </ui-firm-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-firm-form
        class="flex-grow flex flex-col"
        [formName]="'firm_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firm]="{}"
      >
      </ui-firm-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-firm-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [firms]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-firm-select-table-view>
    </ng-template>
  `,
})
export class WebFirmGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
