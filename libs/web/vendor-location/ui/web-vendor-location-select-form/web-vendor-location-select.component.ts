

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared'
import {VendorLocation} from '@case-clinical/web/core/data-access'


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
      <ui-vendor-location-form
        class="flex-grow flex flex-col"
        [formName]="'vendorLocation_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorLocation]="vendorLocation"
      >
      >
      </ui-vendor-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-location-form
        class="flex-grow flex flex-col"
        [formName]="'vendorLocation_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorLocation]="{}"
      >
      </ui-vendor-location-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-vendor-location-select-table-view
        class="w-full h-full bg-white"
        [vendorLocations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-vendor-location-select-table-view>
    </ng-template>
  `,
})
export class WebVendorLocationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  vendorLocation: VendorLocation

  constructor(private store: WebVendorLocationFeatureStore) {
    super()
    this.store.loadVendorLocationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.vendorLocations$.pipe(
      switchMap((vendorLocations) => {
        return of(vendorLocations)
      }),
    )
  }
}

