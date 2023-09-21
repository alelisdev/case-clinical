

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import {Vendor} from '@case-clinical/web/core/data-access'


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
      <ui-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'vendor_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendor]="vendor"
      >
      >
      </ui-vendor-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'vendor_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendor]="{}"
      >
      </ui-vendor-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-vendor-select-table-view
        class="w-full h-full bg-white"
        [vendors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-vendor-select-table-view>
    </ng-template>
  `,
})
export class WebVendorSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  vendor: Vendor

  constructor(private store: WebVendorFeatureStore) {
    super()
    this.store.loadVendorsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.vendors$.pipe(
      switchMap((vendors) => {
        return of(vendors)
      }),
    )
  }
}

