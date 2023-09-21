

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebManufacturerFeatureStore } from '@case-clinical/web/manufacturer/shared'
import {Manufacturer} from '@case-clinical/web/core/data-access'


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
      <ui-manufacturer-form
        class="flex-grow flex flex-col"
        [formName]="'manufacturer_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [manufacturer]="manufacturer"
      >
      >
      </ui-manufacturer-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-manufacturer-form
        class="flex-grow flex flex-col"
        [formName]="'manufacturer_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [manufacturer]="{}"
      >
      </ui-manufacturer-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-manufacturer-select-table-view
        class="w-full h-full bg-white"
        [manufacturers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-manufacturer-select-table-view>
    </ng-template>
  `,
})
export class WebManufacturerSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  manufacturer: Manufacturer

  constructor(private store: WebManufacturerFeatureStore) {
    super()
    this.store.loadManufacturersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.manufacturers$.pipe(
      switchMap((manufacturers) => {
        return of(manufacturers)
      }),
    )
  }
}

