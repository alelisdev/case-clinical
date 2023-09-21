

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'
import {DurableMedicalEquipment} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-durable-medical-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'durableMedicalEquipment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [durableMedicalEquipment]="durableMedicalEquipment"
      >
      >
      </ui-durable-medical-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-durable-medical-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'durableMedicalEquipment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [durableMedicalEquipment]="{}"
      >
      </ui-durable-medical-equipment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-durable-medical-equipment-select-table-view
        class="w-full h-full bg-white"
        [durableMedicalEquipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-durable-medical-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebDurableMedicalEquipmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  durableMedicalEquipment: DurableMedicalEquipment

  constructor(private store: WebDurableMedicalEquipmentFeatureStore) {
    super()
    this.store.loadDurableMedicalEquipmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.durableMedicalEquipments$.pipe(
      switchMap((durableMedicalEquipments) => {
        return of(durableMedicalEquipments)
      }),
    )
  }
}

