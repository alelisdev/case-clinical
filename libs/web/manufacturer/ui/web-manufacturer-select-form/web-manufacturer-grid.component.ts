

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebManufacturerFeatureStore } from '@case-clinical/web/manufacturer/shared'
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
      <ui-manufacturer-form
        class="flex-grow flex flex-col"
        [formName]="'manufacturer_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [manufacturer]="context.value"
      >
      </ui-manufacturer-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-manufacturer-form
        class="flex-grow flex flex-col"
        [formName]="'manufacturer_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [manufacturer]="{}"
      >
      </ui-manufacturer-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-manufacturer-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [manufacturers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-manufacturer-select-table-view>
    </ng-template>
  `,
})
export class WebManufacturerGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
