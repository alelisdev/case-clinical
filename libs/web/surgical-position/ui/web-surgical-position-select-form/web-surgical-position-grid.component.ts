

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSurgicalPositionFeatureStore } from '@case-clinical/web/surgical-position/shared'
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
      <ui-surgical-position-form
        class="flex-grow flex flex-col"
        [formName]="'surgicalPosition_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [surgicalPosition]="context.value"
      >
      </ui-surgical-position-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-surgical-position-form
        class="flex-grow flex flex-col"
        [formName]="'surgicalPosition_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [surgicalPosition]="{}"
      >
      </ui-surgical-position-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-surgical-position-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [surgicalPositions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-surgical-position-select-table-view>
    </ng-template>
  `,
})
export class WebSurgicalPositionGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
