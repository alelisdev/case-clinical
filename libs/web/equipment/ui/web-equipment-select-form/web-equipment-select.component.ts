

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEquipmentFeatureStore } from '@case-clinical/web/equipment/shared'
import {Equipment} from '@case-clinical/web/core/data-access'


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
      <ui-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'equipment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [equipment]="equipment"
      >
      >
      </ui-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'equipment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [equipment]="{}"
      >
      </ui-equipment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-equipment-select-table-view
        class="w-full h-full bg-white"
        [equipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebEquipmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  equipment: Equipment

  constructor(private store: WebEquipmentFeatureStore) {
    super()
    this.store.loadEquipmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.equipments$.pipe(
      switchMap((equipments) => {
        return of(equipments)
      }),
    )
  }
}

