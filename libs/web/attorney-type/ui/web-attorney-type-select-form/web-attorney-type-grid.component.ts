

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAttorneyTypeFeatureStore } from '@case-clinical/web/attorney-type/shared'
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
      <ui-attorney-type-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyType]="context.value"
      >
      </ui-attorney-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-type-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyType]="{}"
      >
      </ui-attorney-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-attorney-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [attorneyTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-attorney-type-select-table-view>
    </ng-template>
  `,
})
export class WebAttorneyTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
