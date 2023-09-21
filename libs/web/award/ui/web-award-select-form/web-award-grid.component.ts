

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAwardFeatureStore } from '@case-clinical/web/award/shared'
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
      <ui-award-form
        class="flex-grow flex flex-col"
        [formName]="'award_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [award]="context.value"
      >
      </ui-award-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-award-form
        class="flex-grow flex flex-col"
        [formName]="'award_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [award]="{}"
      >
      </ui-award-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-award-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [awards]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-award-select-table-view>
    </ng-template>
  `,
})
export class WebAwardGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
