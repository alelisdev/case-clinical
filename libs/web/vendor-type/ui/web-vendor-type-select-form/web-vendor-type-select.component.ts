

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorTypeFeatureStore } from '@case-clinical/web/vendor-type/shared'
import {VendorType} from '@case-clinical/web/core/data-access'


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
      <ui-vendor-type-form
        class="flex-grow flex flex-col"
        [formName]="'vendorType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorType]="vendorType"
      >
      >
      </ui-vendor-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-type-form
        class="flex-grow flex flex-col"
        [formName]="'vendorType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorType]="{}"
      >
      </ui-vendor-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-vendor-type-select-table-view
        class="w-full h-full bg-white"
        [vendorTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-vendor-type-select-table-view>
    </ng-template>
  `,
})
export class WebVendorTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  vendorType: VendorType

  constructor(private store: WebVendorTypeFeatureStore) {
    super()
    this.store.loadVendorTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.vendorTypes$.pipe(
      switchMap((vendorTypes) => {
        return of(vendorTypes)
      }),
    )
  }
}

