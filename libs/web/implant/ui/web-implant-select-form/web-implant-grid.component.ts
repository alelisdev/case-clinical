

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebImplantFeatureStore } from '@case-clinical/web/implant/shared'
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
      <ui-implant-form
        class="flex-grow flex flex-col"
        [formName]="'implant_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implant]="context.value"
      >
      </ui-implant-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-implant-form
        class="flex-grow flex flex-col"
        [formName]="'implant_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implant]="{}"
      >
      </ui-implant-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-implant-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [implants]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-implant-select-table-view>
    </ng-template>
  `,
})
export class WebImplantGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
