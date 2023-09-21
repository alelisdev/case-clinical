

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBodyPartFeatureStore } from '@case-clinical/web/body-part/shared'
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
      <ui-body-part-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPart_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPart]="context.value"
      >
      </ui-body-part-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-body-part-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPart_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPart]="{}"
      >
      </ui-body-part-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-body-part-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [bodyParts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-body-part-select-table-view>
    </ng-template>
  `,
})
export class WebBodyPartGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
