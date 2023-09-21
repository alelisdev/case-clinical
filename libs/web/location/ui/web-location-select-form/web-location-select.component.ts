

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import {Location} from '@case-clinical/web/core/data-access'


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
      [routerKeys]="routerKeys"
      (formRouterKeyDidChange)="formRouterKeyDidChange($event)"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-location-form
        class="flex-grow flex flex-col"
        [formName]="'location_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [location]="location"
      >
      >
      </ui-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-location-form
        class="flex-grow flex flex-col"
        [formName]="'location_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [location]="{}"
      >
      </ui-location-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-location-select-table-view
        class="w-full h-full bg-white"
        [locations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-location-select-table-view>
    </ng-template>
  `,
  providers: [WebLocationFeatureStore],
})
export class WebLocationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  location: Location

  routerKeys = [ 'placeOfServiceId', 'vendorLocationId', 'vendorId', 'clinicalProviderId' ];

  constructor(private store: WebLocationFeatureStore) {
    super()
    this.store.loadLocationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.locations$.pipe(
      switchMap((locations) => {
        return of(locations)
      }),
    )
  }

  formRouterKeyDidChange(routerKeys) {
    if(routerKeys["placeOfServiceId"]) {
      const placeOfServiceId = routerKeys["placeOfServiceId"]
      this.store.setPlaceOfServiceId(placeOfServiceId)
    }

    if(routerKeys["vendorLocationId"]) {
      const vendorLocationId = routerKeys["vendorLocationId"]
      this.store.setVendorLocationId(vendorLocationId)
    }

    if(routerKeys["vendorId"]) {
      const vendorId = routerKeys["vendorId"]
      this.store.setVendorId(vendorId)
    }

    if(routerKeys["clinicalProviderId"]) {
      const clinicalProviderId = routerKeys["clinicalProviderId"]
      this.store.setClinicalProviderId(clinicalProviderId)
    }

    this.store.loadLocationsEffect();
  }
}

