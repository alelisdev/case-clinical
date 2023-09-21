

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationEquipmentFeatureStore } from '@case-clinical/web/prior-authorization-equipment/shared'
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
      <ui-prior-authorization-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationEquipment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationEquipment]="context.value"
      >
      </ui-prior-authorization-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationEquipment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationEquipment]="{}"
      >
      </ui-prior-authorization-equipment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-equipment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthorizationEquipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-authorization-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationEquipmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
