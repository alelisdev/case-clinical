

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'
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
      <ui-durable-medical-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'durableMedicalEquipment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [durableMedicalEquipment]="context.value"
      >
      </ui-durable-medical-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-durable-medical-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'durableMedicalEquipment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [durableMedicalEquipment]="{}"
      >
      </ui-durable-medical-equipment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-durable-medical-equipment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [durableMedicalEquipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-durable-medical-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebDurableMedicalEquipmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
