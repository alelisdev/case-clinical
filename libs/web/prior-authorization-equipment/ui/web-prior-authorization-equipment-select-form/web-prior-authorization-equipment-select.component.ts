

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationEquipmentFeatureStore } from '@case-clinical/web/prior-authorization-equipment/shared'
import {PriorAuthorizationEquipment} from '@case-clinical/web/core/data-access'


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
      <ui-prior-authorization-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationEquipment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationEquipment]="priorAuthorizationEquipment"
      >
      >
      </ui-prior-authorization-equipment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-equipment-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationEquipment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationEquipment]="{}"
      >
      </ui-prior-authorization-equipment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-equipment-select-table-view
        class="w-full h-full bg-white"
        [priorAuthorizationEquipments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-authorization-equipment-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationEquipmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorAuthorizationEquipment: PriorAuthorizationEquipment

  constructor(private store: WebPriorAuthorizationEquipmentFeatureStore) {
    super()
    this.store.loadPriorAuthorizationEquipmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorAuthorizationEquipments$.pipe(
      switchMap((priorAuthorizationEquipments) => {
        return of(priorAuthorizationEquipments)
      }),
    )
  }
}

