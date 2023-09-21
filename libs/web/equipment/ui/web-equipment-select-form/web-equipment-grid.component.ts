

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEquipmentFeatureStore } from '@case-clinical/web/equipment/shared'
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
      <ui-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'equipment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [equipment]="context.value"
      >
      </ui-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'equipment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [equipment]="{}"
      >
      </ui-equipment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-equipment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [equipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebEquipmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
